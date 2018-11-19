import { objectType, arg } from "gqliteral";
import { getHero, getHuman, getDroid } from "../data";

const characterArgs = {
  id: arg("String", {
    required: true,
    description: "id of the character",
  }),
};

const heroArgs = {
  episode: arg("Episode", {
    description:
      "If omitted, returns the hero of the whole saga. If provided, returns the hero of that particular episode.",
  }),
};

export const Query = objectType("Query", (t) => {
  t.field("hero", "Character", {
    args: heroArgs,
    resolve: (_, { episode }) => getHero(episode),
  });
  t.field("human", "Human", {
    args: characterArgs,
    resolve: (_, { id }) => getHuman(id),
  });
  t.field("droid", "Droid", {
    args: characterArgs,
    resolve: (_, { id }) => getDroid(id),
  });
});
