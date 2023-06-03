<script lang="ts">
	import { FormGroup, FormLabel, InputField, FieldError } from '$lib/components/form';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import Textarea from '$lib/components/form/Textarea.svelte';
	import { Listbox } from '@rgossiaux/svelte-headlessui';
	import CustomListboxOption from '$lib/components/listbox/CustomListboxOption.svelte';
	import { CustomListboxOptions } from '$lib/components/listbox';
	import CustomListboxButton from '$lib/components/listbox/CustomListboxButton.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { Table, TableData, TableHeader, TableRow } from '$lib/components/table';
	import { areaMUs, lengthMUs, storageUnits, volumeMUs, weightMUs } from '$lib/constants';
	import CustomAttribute from '$lib/components/custom-attribute/CustomAttribute.svelte';
	import api from '$lib/axios/instance';
	import { user } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import type { ComponentProps } from 'svelte';
	import { CirclePlusMajor } from 'svelte-polaris-icons';
	import type { CustomAttributeProps } from '$lib/types';

	let customAttributes: [typeof CustomAttribute, CustomAttributeProps][] = [];

	const findAttrIdx = (id: any) => {
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
			const productRes = await api.post('/product', {
				name: values.name,
				description: values.description,
				storageUnit: values.storageUnit.value,
				metricUnit: values.metricUnit.value,
				organizationId: $user?.organizationId
			});

			if (productRes.status === 201 && customAttributes.length) {
				saveAllAttributes();
				const productId = productRes.data.id;
				for (const [_, a] of customAttributes) {
					const data = {
						name: a.name,
						unit: a.unit?.value,
						valuePerStorageUnit: Number(a.valuePerStorageUnit),
						metricUnit: a.metricUnit?.value,
						displayValue: a.displayText,
						productId
					};

					const caRes = await api.post('/product/attribute', data);

					if (caRes.status != 201) {
						throw new Error('Failed creating custom attribute', caRes.data);
					}
				}
			}

			goto('/dashboard/product');
		}
	});

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
						<Listbox bind:value={$form.metricUnit} on:change={(e) => ($form.metricUnit = e.detail)}>
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
</div>
