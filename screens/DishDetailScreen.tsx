import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { getMealDetail, Meal } from "../services/api";

const DishDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();


  const { recipeID, cookTime, difficulty } = route.params as any;

  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const recipeDetail = await getMealDetail(recipeID);
      setRecipe(recipeDetail);
    };

    fetchDetail();
  }, []);

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} />
      </TouchableOpacity>

      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      {/* Main Title */}
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.strMeal}</Text>

        <View style={styles.metaContainer}>
          <View style={[styles.badge, styles.categoryBadge]}>
            <Text style={styles.badgeText}>{recipe.strCategory}</Text>
          </View>
          <View style={[styles.badge, styles.areaBadge]}>
            <Text style={styles.badgeText}>{recipe.strArea}</Text>
          </View>
          <View style={[styles.badge, styles.timeBadge]}>
            <Text style={styles.badgeText}>{cookTime} min</Text>
          </View>
          <View style={[styles.badge, styles.difficultyBadge, { backgroundColor: difficulty === 'easy' ? '#4CAF50' : difficulty === 'medium' ? '#FF9800' : '#F44336' }]}>
            <Text style={styles.badgeText}>{difficulty?.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* Ingredients */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.section}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
            const ingredient = (recipe as any)[`strIngredient${num}`];
            const measure = (recipe as any)[`strMeasure${num}`];
            if (ingredient && ingredient.trim() && measure && measure.trim()) {
              return (
                <View key={num} style={styles.ingredientItem}>
                  <Text style={styles.ingredientName}>{ingredient}: </Text>
                  <Text style={styles.ingredientMeasure}>{measure}</Text>
                </View>
              );
            }
            return null;
          })}
        </View>
      </View>

      {/* Steps */}
      <View style={[styles.sectionContainer, { marginTop: 50 }]}>
        <Text style={styles.sectionTitle}>Steps</Text>
        {recipe.strInstructions
          .split(/\r?\n/)
          .map((s: string) => s.trim())
          .filter((s: string) => s.length > 0)
          .filter((s: string) => !/^\d+$/.test(s))
          .map((step: string, index: number) => (
            <View key={index} style={styles.section}>
              <Text style={styles.stepNumber}>
                Step {index + 1}:
              </Text>
              <Text style={styles.stepText}>
                {step}
              </Text>
            </View>
          ))}
      </View>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Cooking</Text>
      </TouchableOpacity>



    </ScrollView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    padding: 16,
    backgroundColor: "#AACDDC",
    borderRadius: 10,
  },
  stepNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    minWidth: 24,
    color: '#344c62',
  },
  stepText: {
    flex: 1,
    lineHeight: 22,
    color: '#000',
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  back: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20
  },

  image: {
    width: "100%",
    height: 300
  },

  content: {
    padding: 20,
    alignItems: "center"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft:"auto",
    marginRight:"auto"
  },


  metaContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
  },
  areaBadge: {
    backgroundColor: '#34C759',
  },
  timeBadge: {
    backgroundColor: '#FF9500',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  section: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  sectionTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 24,
    marginBottom: 15,
    fontWeight: "bold",
    color: "#000000"
  },
  text: {
    marginTop: 10,
    lineHeight: 22
  },
  ingredientList: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  ingredientMeasure: {
    fontWeight: '500',
    color: '#666',
    fontSize: 16,
  },
  ingredientName: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  startButton: {
    backgroundColor: '#ff2d55',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    margin: 15,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default DishDetailScreen;