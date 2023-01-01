import Head from "next/head";

import { Flex, Text } from '@chakra-ui/react';

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>BarberPRO - My barbershop</title>
            </Head>
            <Flex>
                <Text>Wellcome to dashboard!</Text>
            </Flex>
        </>
    );
}