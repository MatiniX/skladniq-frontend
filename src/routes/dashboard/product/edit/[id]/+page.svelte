<script lang="ts">
	import { page } from '$app/stores';
	import api from '$lib/axios/instance';
	import { Button } from '$lib/components/buttons';
	import { FieldError, FormGroup, FormLabel, InputField, Textarea } from '$lib/components/form';
	import { CustomListboxOption, CustomListboxOptions } from '$lib/components/listbox';
	import CustomListboxButton from '$lib/components/listbox/CustomListboxButton.svelte';
	import CustomAttribute from '$lib/components/custom-attribute/CustomAttribute.svelte';
	import { Table, TableHeader, TableRow } from '$lib/components/table';
	import { Listbox } from '@rgossiaux/svelte-headlessui';
	import { onMount } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { CirclePlusMajor } from 'svelte-polaris-icons';
	import * as yup from 'yup';
	import { areaMUs, lengthMUs, storageUnits, volumeMUs, weightMUs } from '$lib/constants';
	import { goto } from '$app/navigation';
	import { getMetricUnit, getStorageUnit } from '$lib/utils';
	import type { CustomAttributeProps } from '$lib/types';

	// TODO: globálne metódy na pracovanie s storage a metric jednotkami

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			name: '',
			description: '',
			storageUnit: storageUnits[0],
			metricUnit: lengthMUs[2]
		},
		validationSchema: yup.object().shape({
			name: yup.string().min(2).required(),
			description: yup.string().min(2).required()
		}),
		onSubmit: async (values) => {
			console.log(customAttributes);
			const productRes = await api.patch('/product', {
				id: $page.params.id,
				name: values.name,
				description: values.description,
				storageUnit: values.storageUnit.value,
				metricUnit: values.metricUnit.value
			});

			if (productRes.status !== 200) {
				throw new Error('something went wrong');
			}

			for (const [_, attr] of customAttributes) {
				const attrRes = await api.patch('/product/attribute', {
					id: attr.id,
					name: attr.name,
					unit: attr.unit?.value,
					metricUnit: Number(attr.metricUnit?.value),
					valuePerStorageUnit: Number(attr.valuePerStorageUnit),
					displayValue: attr.displayText,
					productId: $page.params.id
				});

				if (attrRes.status !== 200) {
					throw new Error('Failed updating attribute');
				}
			}

			goto('/dashboard/product');
		}
	});

	let customAttributes: [typeof CustomAttribute, CustomAttributeProps][] = [];

	let product: any;

	const mapProductAttributes = (attributes: any[]) => {
		const ret: [typeof CustomAttribute, CustomAttributeProps][] = [];
		for (const attribute of attributes) {
			const metricUnit = getMetricUnit(attribute.unit, attribute.metricUnit);
			ret.push([
				CustomAttribute,
				{
					id: attribute.id,
					editMode: false,
					name: attribute.name,
					unit: getStorageUnit(attribute.unit),
					metricUnit,
					valuePerStorageUnit: attribute.valuePerStorageUnit,
					displayText: attribute.displayValue
				}
			]);
		}

		return ret;
	};

	onMount(async () => {
		const res = await api.get('/product/' + $page.params.id);

		if (res.status === 200) {
			product = res.data;
			customAttributes = mapProductAttributes(product.attributes);
			$form.name = product.name;
			$form.description = product.description;
		}
	});

	const findAttrIdx = (id: string) => {
		const attribute = customAttributes.find(([_, a]) => a.id === id);
		return customAttributes.indexOf(attribute!);
	};

	const handleAttributeAdd = () => {
		saveAllAttributes();

		customAttributes = [
			...customAttributes,
			[
				CustomAttribute,
				{
					id: crypto.randomUUID(),
					editMode: true,
					name: '',
					unit: storageUnits[1],
					metricUnit: weightMUs[2],
					valuePerStorageUnit: 0,
					displayText: ''
				}
			]
		];
	};

	const handleAtrributeRemove = (e: CustomEvent<{ id: string }>) => {
		const attrIdx = findAttrIdx(e.detail.id);
		customAttributes.splice(attrIdx, 1);
		customAttributes = customAttributes;
	};

	const saveAllAttributes = () => {
		customAttributes.forEach(([_, a]) => (a.editMode = false));
		customAttributes = customAttributes;
	};

	const setDefaultMetricUnit = (unit: string) => {
		switch (unit) {
			case 'weight':
				$form.metricUnit = weightMUs.filter((u) => u.default === true)[0];
				break;
			case 'length':
				$form.metricUnit = lengthMUs.filter((u) => u.default === true)[0];
				break;
			case 'area':
				$form.metricUnit = areaMUs.filter((u) => u.default === true)[0];
				break;
			case 'volume':
				$form.metricUnit = volumeMUs.filter((u) => u.default === true)[0];
				break;

			default:
				console.error('Unknown metric unit');
				break;
		}
	};
</script>

<div class="px-12 pt-4">
	{#if product}
		<form on:submit={handleSubmit}>
			<div>
				<h3 class="flex items-center text-2xl text-gray-800 font-bold">Create product</h3>
				<div class="grid grid-cols-2 gap-4">
					<FormGroup>
						<FormLabel for="name">Product name</FormLabel>
						<InputField
							bind:value={$form.name}
							on:change={handleChange}
							type="text"
							name="name"
							id="name"
						/>
						{#if $errors.name}
							<FieldError message={$errors.name} />
						{/if}
					</FormGroup>

					<FormGroup class="col-start-1">
						<FormLabel for="description">Product description</FormLabel>
						<Textarea
							bind:value={$form.description}
							on:change={handleChange}
							name="description"
							id="description"
							rows={6}
						/>
						{#if $errors.description}
							<FieldError message={$errors.description} />
						{/if}
					</FormGroup>
					<FormGroup class="col-start-2 row-start-1">
						<FormLabel for="storageUnit">Storage unit</FormLabel>
						<Listbox
							bind:value={$form.storageUnit}
							on:change={(e) => {
								$form.storageUnit = e.detail;
								setDefaultMetricUnit(e.detail.value);
							}}
						>
							<div class="relative">
								<CustomListboxButton>{$form.storageUnit.text}</CustomListboxButton>
								<CustomListboxOptions>
									{#each storageUnits as su}
										<CustomListboxOption value={su}>
											{su.text}
										</CustomListboxOption>
									{/each}
								</CustomListboxOptions>
							</div>
						</Listbox>
					</FormGroup>

					{#if $form.storageUnit.value != 'quantity'}
						<FormGroup class="col-start-2 row-start-2">
							<FormLabel for="metricUnit">Metric unit</FormLabel>
							<Listbox
								bind:value={$form.metricUnit}
								on:change={(e) => ($form.metricUnit = e.detail)}
							>
								<div class="relative">
									<CustomListboxButton>{$form.metricUnit.text}</CustomListboxButton>
									<CustomListboxOptions>
										{#if $form.storageUnit.value === 'weight'}
											{#each weightMUs as wmu}
												<CustomListboxOption value={wmu}>
													{wmu.text}
												</CustomListboxOption>
											{/each}
										{:else if $form.storageUnit.value === 'length'}
											{#each lengthMUs as lmu}
												<CustomListboxOption value={lmu}>
													{lmu.text}
												</CustomListboxOption>
											{/each}
										{:else if $form.storageUnit.value === 'area'}
											{#each areaMUs as amu}
												<CustomListboxOption value={amu}>
													{amu.text}
												</CustomListboxOption>
											{/each}
										{:else if $form.storageUnit.value === 'volume'}
											{#each volumeMUs as vmu}
												<CustomListboxOption value={vmu}>
													{vmu.text}
												</CustomListboxOption>
											{/each}
										{/if}
									</CustomListboxOptions>
								</div>
							</Listbox>
						</FormGroup>
					{/if}
				</div>
			</div>

			<h3 class="my-4 text-lg font-bold">Custom attributes</h3>
			<Table>
				<thead>
					<TableRow>
						<TableHeader>Attribute name</TableHeader>
						<TableHeader>Unit</TableHeader>
						<TableHeader>Metric unit</TableHeader>
						<TableHeader>p.s.u.</TableHeader>
						<TableHeader>Display text</TableHeader>
						<TableHeader>
							<i on:click={handleAttributeAdd} on:keypress={handleAttributeAdd}>
								<CirclePlusMajor
									width={32}
									class="ml-auto p-1 rounded cursor-pointer fill-blue-400 hover:bg-blue-100 hover:fill-blue-500"
								/>
							</i>
						</TableHeader>
					</TableRow>
				</thead>
				<tbody>
					{#each customAttributes as [component, props] (props.id)}
						<svelte:component
							this={component}
							id={props.id}
							bind:editMode={props.editMode}
							bind:name={props.name}
							bind:unit={props.unit}
							bind:metricUnit={props.metricUnit}
							bind:valuePerStorageUnit={props.valuePerStorageUnit}
							bind:displayText={props.displayText}
							on:remove={handleAtrributeRemove}
						/>
					{/each}
				</tbody>
			</Table>
			<Button type="submit" className="mt-2">Submit</Button>
		</form>
	{/if}
</div>
