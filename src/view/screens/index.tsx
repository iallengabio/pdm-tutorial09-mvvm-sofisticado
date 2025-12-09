import { authUseCases } from '@/src/di/container';
import useLoginViewModel from '@/src/viewmodel/useLoginViewModel';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card, HelperText, TextInput } from "react-native-paper";

export const Login = ()=> {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {userId, error, loading, login} = useLoginViewModel(authUseCases);

    function handleLogin(){
      login(email,password);
    }
  
    useEffect(() => {
        if (userId) {
            router.replace("./home");
        }else{
          setPassword('');
          setEmail('');
        }
    }, [userId,error]);

    if (loading) {
        return (
            <View style={styles.containerCenter}>
                <ActivityIndicator animating size={48} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title title="Entrar" subtitle="Acesse sua conta" />
                <Card.Content>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        left={<TextInput.Icon icon="email" />}
                        style={styles.input}
                    />
                    <TextInput
                        mode="outlined"
                        label="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        left={<TextInput.Icon icon="lock" />}
                        style={styles.input}
                    />
                    {error && (
                        <HelperText type="error" visible>{error}</HelperText>
                    )}
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={handleLogin}>Login</Button>
                    <Button onPress={()=>{router.push("./signup");}}>Faça seu cadastro</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center"
    },
    containerCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        marginBottom: 12
    }
});