import { View, Text } from "react-native";
import React from "react";
import RNText from "../RNText";
import { FlatList } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Solution from "./Solution";
import { useTheme } from "react-native-paper";

const ClimateSolutions = () => {
  const { colors } = useTheme();
  const solutions = [
    {
      id: 1,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3bb0SYmgTuDU_FCeWpSK5FMUm5q6Y_NNZ4Q&s",
      title: "Healthy Eating",
      description:
        "A balanced diet with whole foods, lean proteins, and fiber keeps your body strong and energized.",
    },
    {
      id: 2,
      img: "https://www.uhhospitals.org/-/media/images/blog/2023/02/woman-asleep-bed-1389534656-blog-mainarticleimage.jpg?h=450&w=720&la=en&hash=9C9F1C3FBD09A1AD63E8219B39726AD2",
      title: "Quality Sleep",
      description:
        "Getting 7-9 hours of restful sleep helps improve brain function, immunity, and overall well-being.",
    },
    {
      id: 3,
      img: "https://www.nebraskamed.com/sites/default/files/images/weight-loss/AtHomeExercise_OpenGraph.png",
      title: "Regular Exercise",
      description:
        "Staying active with at least 30 minutes of movement daily reduces stress and keeps your heart healthy.",
    },
    {
      id: 4,
      img: "https://images.moneycontrol.com/static-mcnews/2023/05/World-hand-hygiene-day.jpg?impolicy=website&width=1600&height=900",
      title: "Proper Hygiene",
      description:
        "Washing hands, maintaining oral health, and keeping surroundings clean help prevent infections.",
    },
    {
      id: 5,
      img: "https://iimtu.edu.in/blog/wp-content/uploads/2023/11/Stress-12.jpg",
      title: "Stress Management",
      description:
        "Practicing meditation, deep breathing, and mindfulness can reduce anxiety and improve mental health.",
    },
    {
      id: 6,
      img: "https://bestcare.org/sites/default/files/styles/featured_media/public/best_care_today/featured_image/HealthyRelationship.jpg?itok=3qEh0bqZ",
      title: "Healthy Relationships",
      description:
        "Strong social connections improve mental well-being and reduce the risk of depression.",
    },
    {
      id: 7,
      img: "https://cdn1.poz.com/147390_P06-24-021.jpg_3365cd62-302c-4d5f-9186-79e0bef1b797.jpg",
      title: "Medication Adherence",
      description:
        "Taking prescribed medicines on time and as directed ensures better treatment outcomes.",
    },
    {
      id: 8,
      img: "https://blogs.worldbank.org/content/dam/sites/blogs/img/detail/mgr/vaccination.png",
      title: "Vaccination & Immunization",
      description:
        "Staying up-to-date with vaccines protects you and others from preventable diseases.",
    },
    {
      id: 9,
      img: "https://medlineplus.gov/images/WomensHealthCheckup_Share.jpg",
      title: "Regular Health Check-ups",
      description:
        "Routine screenings help detect potential health issues early for better prevention and treatment.",
    },
    {
      id: 10,
      img: "https://lovinglifeco.com/wp-content/uploads/2023/04/lady-staying-hydrated-drinking-water-from-a-bottle.jpg",
      title: "Hydration",
      description:
        "Drinking enough water keeps your body functioning properly and boosts energy levels.",
    },
  ];

  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <RNText
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 10,
          fontSize: 20,
          color: colors.text,
        }}
        font={"M-SemiBold"}
      >
       Take care of your health 💙
      </RNText>

      <FlatList
        data={solutions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        snapToInterval={widthPercentageToDP(70)}
        renderItem={({ item }) => {
          return <Solution item={item} />;
        }}
      />
    </View>
  );
};

export default ClimateSolutions;
