import CardsComp from "./cardsComp";
import TableComp from "./tableComp";

export default async function HomePageComp() {
  return (
    <div className="h-full space-y-6 p-4">
      <CardsComp />
      <TableComp />
    </div>
  );
}
