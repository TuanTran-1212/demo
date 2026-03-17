import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { searchMeals } from '../services/api'
import Ionicons from '@react-native-vector-icons/ionicons'

const HomeScreen = () => {
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation<any>()

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const meals = await searchMeals();
       setRecipes(meals.slice(0, 20));
      } catch (error) {
        console.log("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  const renderRecipeCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("DishDetail", { 
        recipeID: item.id, 
        cookTime: item.cookTime, 
        difficulty: item.difficulty })}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.category}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.details}>
          <Text>🕐 {item.cookTime} min</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: item.difficulty === 'easy' ? '#4CAF50' : item.difficulty === 'medium' ? '#FF9800' : '#F44336' }]}>
            <Ionicons name="flame" size={12} color="#fff" />
            <Text style={styles.difficultyText}>{item.difficulty.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.bookmark}>
        <Ionicons name='heart' size={16} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading recipes...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome To HomeCook</Text>
        <Text style={styles.subtitle}>Here is What we recommend for you!</Text>
      </View>
      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<Text style={styles.emptyText}>No recipes found</Text>}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 55,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  bookmark: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF2D55",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: "space-between",
  },

  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 2,
    fontWeight: "bold"
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666'
  }
})
