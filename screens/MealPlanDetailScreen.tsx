import {StyleSheet,Text,View,ScrollView,Image, TouchableOpacity, FlatList,
} from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Meal } from '../services/api';
import Ionicons from '@react-native-vector-icons/ionicons';

const MealPlanDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const plan  = route.params?.plan;
  if (!plan) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No plan data</Text>
      </View>
    );
  }

  const renderRecipeCard = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DishDetail', { recipeID: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeMeta}>
          <Text style={styles.recipeCategory}>{item.category}</Text>
          <Text style={styles.recipeTime}>{item.cookTime} min</Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Recipe</Text>
          <Ionicons name="arrow-forward" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={plan.recipes}
      renderItem={renderRecipeCard}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}

      ListHeaderComponent={
        <>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.planTitle}>{plan.name}</Text>

            <View style={styles.recipeCount}>
              <Ionicons name="restaurant" size={20} color="#007AFF" />
              <Text style={styles.recipeCountText}>
                {plan.recipes.length} recipes
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Plan Overview</Text>
            <Text style={styles.descriptionText}>
              Delicious {plan.name.toLowerCase()} recipes ready for your table.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Recipes</Text>
        </>
      }

      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Ionicons name="restaurant-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No recipes in this plan</Text>
        </View>
      }
    />
  );
};


export default MealPlanDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  planTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  recipeCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recipeCountText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: '#f8f9ff',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 40,
  },
  recipeCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  recipeCategory: {
    fontSize: 14,
    color: '#666',
  },
  recipeTime: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

