import React from "react";
import Reviews from "./Reviews";

const ReviewCard = () => {
  const CardData = [
    {
      username: "John Doe",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting",
      itemtype: "",
      date: "12/08/2024",
      user: "Verified Buyer",
    },
    {
      username: "John Doe",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting",
      itemtype: "",
      date: "12/08/2024",
      user: "Verified Buyer",
    },
    {
      username: "John Doe",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting",
      itemtype: "",
      date: "12/08/2024",
      user: "Verified Buyer",
    },
    {
      username: "John Doe",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting",
      itemtype: "",
      date: "12/08/2024",
      user: "Verified Buyer",
    },
    {
      username: "John Doe",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting",
      itemtype: "",
      date: "12/08/2024",
      user: "Verified Buyer",
    },
    {
      username: "John Doe",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting",
      itemtype: "",
      date: "12/08/2024",
      user: "Verified Buyer",
    },
  ];

  return (
    <>
      <Reviews carddata={CardData} />
    </>
  );
};

export default ReviewCard;
