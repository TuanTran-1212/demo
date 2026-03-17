import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { searchMeals, Meal } from '../services/api';
import Ionicons from '@react-native-vector-icons/ionicons';

const MealPlansScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [mealPlans, setMealPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meals = await searchMeals();
        setRecipes(meals.slice(0, 20));

        const plans = [
          {
            name: 'Focus on Fiber',
            recipes: meals.slice(0, 3)
          },

          {
            name: 'Spring Holidays Made Simple',
            recipes: meals.slice(4, 7)
          },

          {
            name: 'One Pot No-Stress Cooking',
            recipes: meals.slice(7, 11)
          },

          {
            name: 'More Meal Plans',
            recipes: meals.slice(11, 13)
          },
        ];
        setMealPlans(plans);
      } catch (error) {
        console.log('Error fetching meal plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const renderPlanCard = ({ item }: { item: any }) => (
    <TouchableOpacity

        style={styles.planCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('MealPlans' as never)
      }>

      <Image source={{ uri: item.recipes[0]?.image}} style={styles.planImage} />
      <View style={styles.planInfo}>
        <Text style={styles.planName}>{item.name}</Text>

        <Text style={styles.planCategory}>{item.recipes[0]?.category || 'Various'}</Text>
        <Text style={styles.planCount}>{item.recipes.length} recipes</Text>
      </View>
      <View style={styles.planAction}>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading meal plans...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
     <View style={styles.header}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/1065/1065715.png',
          }}
          style={styles.headerImage}
        />
        <View style={styles.headerText}>
          <Text style={styles.unlockText}>Unlock all of Meal Plans</Text>
          <Text style={styles.subText}>
            Create your own plans and see the full library of Tasty plans with
            Tasty +
          </Text>
        </View>
      </View>

      {/* Featured Collage */}
      <View style={styles.featuredContainer}>
        <Image source={{ uri: recipes[0]?.image }} style={styles.featuredImage1} />
        <Image source={{ uri: recipes[1]?.image }} style={styles.featuredImage2} />
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>Explore {recipes.length}+ recipes</Text>
        </View>
      </View>

      {/* Plans List */}
      <Text style={styles.sectionTitle}>Recommended Plans</Text>
      <FlatList
        data={mealPlans}
        renderItem={renderPlanCard}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* CTA Button */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Create Your Own Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MealPlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop:55,
    marginBottom: 10,
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
    marginBottom:10,
  },
  headerText: {
    flex: 1,
    paddingRight: 10,
  },
  unlockText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  featuredContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    position: 'relative',
    marginBottom: 20,
  },
  featuredImage1: {
    flex: 2,
    height: 160,
    borderRadius: 15,
    marginRight: 10,
  },
  featuredImage2: {
    flex: 1,
    height: 160,
    borderRadius: 15,
  },
  featuredBadge: {
    position: 'absolute',
    bottom: 0,
    right: 150,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: '#333',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  planCard: {
    flexDirection: 'row',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderLeftWidth: 4,
    elevation: 3,
    alignItems: 'center',
  },
  planImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 15,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  planCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  planCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  planAction: {
    paddingLeft: 10,
  },
  ctaButton: {
    backgroundColor: '#FF6B6B',
    margin: 25,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
