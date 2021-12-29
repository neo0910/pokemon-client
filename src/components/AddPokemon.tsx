import {Formik, Form, Field, FieldArray} from 'formik';
import * as Yup from 'yup';
import React, {FC, memo, useState} from 'react';

import {Button} from '../ui/StyledButton';
import {Flex} from '../ui/StyledFlex';
import {FormikInput} from '../ui/StyledInput';
import {pokemonApi} from '../services/PokemonService';
import {PokemonDto} from '../models/Pokemon';
import {typeApi} from '../services/TypeService';
import Modal from './Modal';

const AddPokemon: FC = () => {
    const {data: types} = typeApi.useFetchTypesQuery();
    const [createPokemon] = pokemonApi.useCreatePokemonMutation();

    const [visible, setVisible] = useState(false);

    const submit = async (payload: PokemonDto) => {
        await createPokemon(payload);
        setVisible(false);
    };

    return (
        <>
            <Button outline onClick={() => setVisible(!visible)}>
                Add pokemon
            </Button>
            <Modal options={{title: 'Add Pokemon'}} setVisible={setVisible} visible={visible}>
                <Formik
                    initialValues={
                        {
                            description: '',
                            height: 0,
                            name: '',
                            number: 0,
                            type_id: types ? [types[0]?.id.toString()] : [],
                            weight: 0,
                        } as PokemonDto
                    }
                    onSubmit={submit}
                    validationSchema={Yup.object({
                        name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                        description: Yup.string().max(200, 'Must be 200 characters or less').required('Required'),
                        number: Yup.number().min(1, 'Min value is 1').max(999, 'Too much').required('Number required'),
                        height: Yup.number()
                            .min(0.01, 'Min value is 0.01')
                            .max(999999, 'Too much')
                            .required('Number required'),
                        weight: Yup.number()
                            .min(0.01, 'Min value is 0.01')
                            .max(999999, 'Too much')
                            .required('Number required'),
                    })}
                >
                    {({values}) => (
                        <Form>
                            <Flex column gap="16px">
                                <FormikInput
                                    autoFocus
                                    label="Pokemon name"
                                    name="name"
                                    placeholder="Onix"
                                    type="text"
                                />
                                <FormikInput
                                    label="Pokemon description"
                                    name="description"
                                    placeholder="Rock pokemon"
                                    type="text"
                                />
                                <FormikInput type="number" name="number" placeholder="95" label="Pokemon number" />
                                <FormikInput type="number" name="height" placeholder="8.8" label="Pokemon height (m)" />
                                <FormikInput
                                    label="Pokemon weight (kg)"
                                    name="weight"
                                    placeholder="210"
                                    type="number"
                                />

                                <FieldArray name="type_id">
                                    {({insert, remove, push}) => (
                                        <Flex column width="100%">
                                            {values.type_id.map((type, i) => (
                                                <Flex key={i} column width="100%">
                                                    {i === 0 && (
                                                        <label htmlFor="type" style={{fontWeight: 600}}>
                                                            Pokemon type
                                                        </label>
                                                    )}
                                                    <Flex width="100%">
                                                        <Field
                                                            as="select"
                                                            name={`type_id[${i}]`}
                                                            style={{height: 32, width: '100%', flexGrow: 1}}
                                                        >
                                                            {(types || []).map((t) => (
                                                                <option key={t.id} value={t.id}>
                                                                    {t.name}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                        <Button
                                                            outline
                                                            onClick={() => remove(i)}
                                                            type="button"
                                                            visible={values.type_id.length > 1}
                                                        >
                                                            X
                                                        </Button>
                                                    </Flex>
                                                </Flex>
                                            ))}
                                            <Button
                                                outline
                                                onClick={() => types && push(types[0].id)}
                                                type="button"
                                                visible={types && types.length > 1}
                                            >
                                                Add Type
                                            </Button>
                                        </Flex>
                                    )}
                                </FieldArray>

                                <Flex gap="0" width="100%">
                                    <Button outline type="button" onClick={() => setVisible(false)}>
                                        Cancel
                                    </Button>
                                    <Button primary type="submit">
                                        Save
                                    </Button>
                                </Flex>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default memo(AddPokemon);
