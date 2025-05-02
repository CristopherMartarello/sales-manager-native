import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text} from 'react-native';
import { Appbar, TextInput, Button, RadioButton, Checkbox } from 'react-native-paper';
import { VStack, Tooltip, Box } from 'native-base';

export default function AddProductScreen({ navigation, route, products, setProducts }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoria, setCategoria] = useState('Geral');
  const [isAVista, setIsAVista] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const { editProduct = null } = route.params || {};

      if (editProduct) {
        setName(editProduct.name);
        setPrice(editProduct.price.toString());
        setCategoria(editProduct.categoria);
        setIsAVista(editProduct.isAVista);
        setIsEditMode(true);
      } else {
        setName('');
        setPrice('');
        setCategoria('Geral');
        setIsAVista(false);
        setIsEditMode(false);
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const handleSaveProduct = () => {
    if (isEditMode) {
      setProducts(products.map(p =>
        p.id === route.params?.editProduct?.id
        ? { ...route.params.editProduct, name, price, categoria, isAVista, concluida: p.concluida }
        : p
      ));
    } else {
      setProducts([
        ...products,
        { id: Date.now(), name, price, categoria, isAVista, concluida: false }
      ]);
    }
    navigation.navigate('Home');
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={isEditMode ? "Editar Venda" : "Adicionar Venda"} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <VStack space={4}>
          <Tooltip label="Digite o nome da venda" placement="top">
            <Box>
              <TextInput
                label="Nome do Venda"
                value={name}
                onChangeText={setName}
                left={<TextInput.Icon icon="tag" />}
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <Tooltip label="Digite o preço" placement="top">
            <Box>
              <TextInput
                label="Preço"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                left={<TextInput.Icon icon="currency-usd" />}
                mode="outlined"
              />
            </Box>
          </Tooltip>

          <View
            style={{
                backgroundColor: '#e2dee3', 
                padding: 8,
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
                Selecione a categoria
            </Text>
          </View>

          <RadioButton.Group onValueChange={setCategoria} value={categoria}>
            <RadioButton.Item label="Geral" value="Geral" />
            <RadioButton.Item label="Encomenda" value="Encomenda" />
            <RadioButton.Item label="Entrega" value="Entrega" />
          </RadioButton.Group>

          <Checkbox.Item
            label="A venda é a Vista?"
            status={isAVista ? 'checked' : 'unchecked'}
            onPress={() => setIsAVista(!isAVista)}
          />

          <Button 
            mode="contained" 
            onPress={handleSaveProduct}
            style={{ marginTop: 10 }}
            icon={isEditMode ? "pencil" : "content-save"}
          >
            {isEditMode ? "Atualizar Venda" : "Salvar Venda"}
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
}
