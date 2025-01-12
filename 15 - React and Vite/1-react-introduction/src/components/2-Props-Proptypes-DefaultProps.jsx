import propTypes from "prop-types";

function Book() {
  return (
    <>
      <BookCard title="Atomic Habits" author="MEEE" rating={4.8}></BookCard>
      <BookCard
        title="sample title 2"
        author="author 1"
        rating={3.5}
        isAvailable={true}
      ></BookCard>
      <BookCard
        title="sammple title 3"
        author="author 2"
        rating={4.3}
        isAvailable={true}
      ></BookCard>
      <BookCard></BookCard>
    </>
  );
}

function BookCard(props) {
  return (
    <div>
      <p>Title: {props.title}</p>
      <p>autor: {props.author}</p>
      <p>rating:{props.rating}</p>
      <p>IsAvailable: {props.isAvailable ? "Yes" : "No"}</p>
    </div>
  );
}

BookCard.propTypes = {
  title: propTypes.string,
  author: propTypes.string,
  rating: propTypes.number,
  isAvailable: propTypes.bool,
};

BookCard.defaultProps = {
  title: "No title",
  author: "No author",
  rating: 0.0,
  isAvailable: false,
};

export default Book;
