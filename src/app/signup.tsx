import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card, HelperText, TextInput } from "react-native-paper";
import { authUseCases } from "../di/container";
import useSignupViewModel from "../viewmodel/useSignupViewModel";

const Index = ()=> {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    const { userId, error, loading, cadastro } = useSignupViewModel(authUseCases);

    useEffect(() => {
        if (userId) {
            router.replace("./home");
        }else{
          setPassword('');
          setEmail('');
          setPasswordConf('');
        }
    }, [userId,error]);

    if(loading){
        return (
            <View style={styles.containerCenter}>
                <ActivityIndicator animating size={48} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title title="Cadastro" subtitle="Crie sua conta" />
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
                    <TextInput
                        mode="outlined"
                        label="Confirme a senha"
                        value={passwordConf}
                        onChangeText={setPasswordConf}
                        secureTextEntry
                        left={<TextInput.Icon icon="lock-check" />}
                        style={styles.input}
                    />
                    {error && (
                        <HelperText type="error" visible>{error}</HelperText>
                    )}
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={()=>{cadastro(email,password,passwordConf);}}>Cadastrar</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

export default Index;

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