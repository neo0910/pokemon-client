import {Formik, Form, Field} from 'formik';
import React, {FC, memo, useCallback, useContext, useEffect, useState} from 'react';
import * as Yup from 'yup';

import {Button} from '../ui/StyledButton';
import {Context} from '..';
import {Flex} from '../ui/StyledFlex';
import {FormikInput} from '../ui/StyledInput';
import {PokemonDto} from '../models/Pokemon';
import Modal from './Modal';

const AddPokemon: FC = () => {
    const [visible, setVisible] = useState(false);
    const setVisibleCallback = useCallback(setVisible, [setVisible]);
    const {typesStore} = useContext(Context);
    const {pokemonStore} = useContext(Context);

    useEffect(() => {
        typesStore.getTypes();
    }, [typesStore]);

    const submit = async (payload: PokemonDto) => {
        await pokemonStore.createPokemon(payload);
        setVisible(false);
    };

    return (
        <>
            <Button outline onClick={() => setVisible(!visible)}>
                Add pokemon
            </Button>
            <Modal options={{title: 'Add Pokemon'}} setVisible={setVisibleCallback} visible={visible}>
                <Formik
                    initialValues={
                        {
                            description: '',
                            height: 0,
                            name: '',
                            number: 0,
                            type_id: typesStore.types[0]?.id.toString(),
                            weight: 0,
                        } as PokemonDto
                    }
                    onSubmit={submit}
                    validationSchema={Yup.object({
                        name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                        description: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
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
                    <Form>
                        <Flex column gap="16px">
                            <FormikInput type="text" name="name" placeholder="Onix" label="Pokemon name" />
                            <FormikInput
                                label="Pokemon description"
                                name="description"
                                placeholder="Rock pokemon"
                                type="text"
                            />
                            <FormikInput type="number" name="number" placeholder="95" label="Pokemon number" />
                            <FormikInput type="number" name="height" placeholder="8.8" label="Pokemon height (m)" />
                            <FormikInput label="Pokemon weight (kg)" name="weight" placeholder="210" type="number" />

                            <Flex column width="100%">
                                <label htmlFor="type" style={{fontWeight: 600}}>
                                    Pokemon type
                                </label>
                                <Field as="select" name="type_id" style={{height: 32, width: '100%'}}>
                                    {typesStore.types.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </Field>
                            </Flex>

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
                </Formik>
            </Modal>
        </>
    );
};

export default memo(AddPokemon);
