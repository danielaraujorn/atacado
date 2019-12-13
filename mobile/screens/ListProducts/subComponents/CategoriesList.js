import React, { Component } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from 'native-base';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS } from '../gqls';
import { ProductsList } from './ProductsList';

const Category = ({ category, navigation }) => {
  const { id: categoryId } = category;
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { categoryId },
  });
  if (loading || error) return null;
  const { getProducts: products = [] } = data;
  return <ProductsList navigation={navigation} products={products} />;
};

export class CategoriesList extends Component {
  state = { selectedTab: this.props.categories[0].id };

  screenScrollRef = null;

  headerScrollRef = null;

  changeTab = (selectedTab, index) => {
    this.setState({ selectedTab });
    this.headerScrollRef.scrollToIndex({ index, viewOffset: 20 });
    this.screenScrollRef.scrollToIndex({ index });
  };

  categoryFlatConfig = {
    viewAreaCoveragePercentThreshold: 95,
    waitForInteraction: true,
  };

  onCategoryFlatChanged = ({ viewableItems }) => {
    if (viewableItems.length === 1) {
      const [
        {
          item: { id },
          index,
        },
      ] = viewableItems;
      this.setState({ selectedTab: id });
      this.headerScrollRef.scrollToIndex({ index, viewOffset: 20 });
    }
  };
  render() {
    const { navigation, categories } = this.props;
    const { selectedTab } = this.state;
    return (
      <>
        <View>
          <FlatList
            style={{ borderBottomWidth: 1, borderBottomColor: '#00000022' }}
            ref={ref => (this.headerScrollRef = ref)}
            data={categories}
            initialNumToRender={4}
            contentContainerStyle={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={({ id }) => `${id}`}
            horizontal
            extraData={selectedTab}
            renderItem={({ item: { name, id }, index }) => (
              <View>
                <TouchableOpacity
                  onPress={() => this.changeTab(id, index)}
                  style={{
                    paddingRight: 20,
                    paddingVertical: 8,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: selectedTab === id ? 'black' : '#CCC',
                      }}
                    >
                      {name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={ref => (this.screenScrollRef = ref)}
            initialNumToRender={1}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
            data={categories}
            keyExtractor={({ id }) => `${id}`}
            extraData={selectedTab}
            renderItem={({ item: category }) => (
              <Category category={category} navigation={navigation} />
            )}
            viewabilityConfig={this.categoryFlatConfig}
            onViewableItemsChanged={this.onCategoryFlatChanged}
          />
        </View>
      </>
    );
  }
}
