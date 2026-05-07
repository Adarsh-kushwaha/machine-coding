import { Star } from "../components/star/star-rating";

export const StarRating = () => {
  return (
    <>
      <div>
        <h4>Star rating</h4>
        <Star rating={0} noOfStar={5}/>
      </div>
    </>
  );
};
