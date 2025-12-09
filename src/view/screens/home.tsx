import { authUseCases } from '@/src/di/container';
import useHomeViewModel from '@/src/viewmodel/useHomeViewModel';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, Text } from 'react-native-paper';

export const Home = ()=>{
    const { userId, logout } = useHomeViewModel(authUseCases);
    useEffect(() => {
            if (!userId) {
                console.log('indo para index');
                router.replace("./");
            }
        }, [userId]);

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Home" />
                <Appbar.Action icon="logout" onPress={logout} />
            </Appbar.Header>
            <Card style={styles.card}>
                <Card.Title title="Bem-vindo" />
                <Card.Content>
                    <Text variant="bodyLarge">User ID: {userId}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={logout}>Logout</Button>
                </Card.Actions>
            </Card>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        margin: 16
    }
});