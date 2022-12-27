import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import {
    Flex,
    Text,
    Center,
    Input,
    Button
} from '@chakra-ui/react';

import logoImg from '../../../public/images/logo.svg';

export default function Login() {
    return (
        <>
            <Head>
                <title>Barber Pro - Log in</title>
            </Head>
            <Flex background="barber.900" height='100vh' alignItems='center' justifyContent='center'>
                <Flex width={640} direction='column' p={14} rounded={8}>
                    <Center p={4}>
                        <Image
                            width={240}
                            src={logoImg}
                            quality={100}
                            alt='Logo Barber Pro'
                        />
                    </Center>

                    <Input
                        background='barber.400'
                        color='white'
                        variant='filled'
                        size='lg'
                        placeholder='email@email.com'
                        type='email'
                        mb={3}
                    />

                    <Input
                        background='barber.400'
                        color='white'
                        variant='filled'
                        size='lg'
                        placeholder='Enter password'
                        type='password'
                        mb={6}
                    />

                    <Button
                        background='button.cta'
                        color='gray.900'
                        mb={6}
                        size='lg'
                        _hover={{ bg: '#FFB13E' }}
                    >
                        Log in
                    </Button>

                    <Center color='white' mt={2}>
                        <Link href='/register'>
                            <Text>Do not have an account yet? <strong>Register</strong></Text>
                        </Link>
                    </Center>

                </Flex>
            </Flex>
        </>
    )
}
