import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, FAB, Banner, DataTable, Dialog, Portal, Button, Text, Checkbox, IconButton, Chip } from 'react-native-paper';
import { useThemeContext } from '../contexts/ThemeContext';

export default function HomeScreen({ navigation, products, setProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Geral');
  const [isConcluida, setIsConcluida] = useState(false);
  const { toggleTheme } = useThemeContext();

  const handleDeleteProduct = () => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== selectedProduct?.id));
    setSelectedProduct(null);
    setVisibleDialog(false);
  };

  const openDeleteDialog = (product) => {
    setSelectedProduct(product);
    setVisibleDialog(true);
  };

  const openEditScreen = (product) => {
    navigation.navigate('Adicionar', { editProduct: product });
  };

  const openAddScreen = () => {
    navigation.navigate('Adicionar', { editProduct: null });
  };

  const handleSaveDone = () => {
    setIsConcluida(!isConcluida);
  }

  const toggleConcluida = (productId) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, concluida: !p.concluida } : p
      )
    );
  };

  const produtosFiltrados =
    categoriaFiltro === 'Geral'
      ? products
      : categoriaFiltro === 'Concluídas'
      ? products.filter(p => p.concluida)
      : products.filter(p => p.categoria === categoriaFiltro);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="SM - Gerenciador de Vendas" />
        <Appbar.Action icon="theme-light-dark" onPress={toggleTheme} />
      </Appbar.Header>

      <ScrollView style={{ margin: 10 }}>
        <Banner
          visible={bannerVisible}
          actions={[
            { label: 'OK', onPress: () => setBannerVisible(false) }
          ]}
          icon="information"
        >
          Seja Bem-Vindo ao Sales Manager! Gerencie suas vendas com praticidade e confiança.
        </Banner>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={categoriaFiltro === 'Geral'}
            onPress={() => setCategoriaFiltro('Geral')}
          >
            Geral
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={categoriaFiltro === 'Encomenda'}
            onPress={() => setCategoriaFiltro('Encomenda')}
          >
            Encomenda
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={categoriaFiltro === 'Entrega'}
            onPress={() => setCategoriaFiltro('Entrega')}
          >
            Entrega
          </Chip>
          <Chip
            style={{ marginRight: 5, marginBottom: 5 }}
            selected={categoriaFiltro === 'Concluídas'}
            onPress={() => setCategoriaFiltro('Concluídas')}
          >
            Concluídas
          </Chip>
        </View>

        {produtosFiltrados.length === 0 ? (
            <View style={{ margin: 14, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{ fontWeight: 'bold'}}>Não foram encontradas vendas (0).</Text>
            </View>
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Concluída</DataTable.Title>
              <DataTable.Title>Nome</DataTable.Title>
              <DataTable.Title>A Vista</DataTable.Title>
              <DataTable.Title>Categoria</DataTable.Title>
              <DataTable.Title numeric>Preço</DataTable.Title>
              <DataTable.Title numeric>Ações</DataTable.Title>
            </DataTable.Header>

            {produtosFiltrados.map((product) => (
              <DataTable.Row key={product.id}>
                <DataTable.Cell>
                <Checkbox
                  status={product.concluida ? 'checked' : 'unchecked'}
                  onPress={() => toggleConcluida(product.id)}
                />
                </DataTable.Cell>
                <DataTable.Cell>{product.name}</DataTable.Cell>
                <DataTable.Cell>{product.isAVista ? 'Sim' : 'Não'}</DataTable.Cell>
                <DataTable.Cell>{product.categoria}</DataTable.Cell>
                <DataTable.Cell numeric>R$ {product.price}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() => openEditScreen(product)}
                    />
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => openDeleteDialog(product)}
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </ScrollView>

      <Portal>
        <Dialog visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
          <Dialog.Title>Confirmação</Dialog.Title>
          <Dialog.Content>
            <Text>Deseja realmente excluir "{selectedProduct?.name}"?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleDialog(false)}>Cancelar</Button>
            <Button onPress={handleDeleteProduct}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={openAddScreen}
      />
    </>
  );
}
