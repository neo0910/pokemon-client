import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import React, {FC, memo, useState} from 'react';

import {Button} from '../ui/StyledButton';
import {Flex} from '../ui/StyledFlex';
import {FormikInput} from '../ui/StyledInput';
import {typeApi} from '../services/TypeService';
import {TypeDto} from '../models/Type';
import Modal from './Modal';

const AddType: FC = () => {
    const [createType] = typeApi.useCreateTypeMutation();

    const [visible, setVisible] = useState(false);

    const submit = async (payload: TypeDto) => {
        await createType(payload);
        setVisible(false);
    };

    return (
        <>
            <Button outline onClick={() => setVisible(!visible)}>
                Add Type
            </Button>
            <Modal options={{title: 'Add Type'}} setVisible={setVisible} visible={visible}>
                <Formik
                    initialValues={{name: ''} as TypeDto}
                    onSubmit={submit}
                    validationSchema={Yup.object({
                        name: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
                    })}
                >
                    <Form>
                        <Flex column gap="16px">
                            <FormikInput type="text" name="name" placeholder="Rock" label="Pokemon type" autoFocus />

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

export default memo(AddType);
