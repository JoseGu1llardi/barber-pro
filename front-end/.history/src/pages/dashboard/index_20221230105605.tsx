import Head from "next/head";

import { Flex, Text } from '@chakra-ui/react';

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>BarberPRO - My barbershop</title>
            </Head>
            <Flex background="barber.900" height='100vh'>
                <Text>Welcome to dashboard!</Text>
            </Flex>
        </>
    );
}