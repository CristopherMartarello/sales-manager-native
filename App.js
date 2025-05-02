import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
import BottomTabs from './navigation/BottomTabs';

function Main() {
  const { theme } = useThemeContext();
  const [products, setProducts] = useState([]);

  return (
    <PaperProvider theme={theme}>
      <NativeBaseProvider>
        <NavigationContainer theme={theme}>
          <BottomTabs products={products} setProducts={setProducts} />
        </NavigationContainer>
      </NativeBaseProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
