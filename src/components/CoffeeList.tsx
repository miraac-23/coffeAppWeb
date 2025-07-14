
import { Grid } from '@mui/material';
import CoffeeCard from './CoffeeCard';
import { Coffe } from '../types/coffeeTypes';

interface CoffeeListProps {
  coffees: Coffe[];
  onCardClick: (coffee: Coffe) => void;
}

const CoffeeList = ({ coffees, onCardClick }: CoffeeListProps) => {
  return (
    <>
      {coffees.map((coffee) => (
        <Grid item xs={12} sm={6} md={4} key={coffee.id}>
          <CoffeeCard coffee={coffee} onClick={() => onCardClick(coffee)} />
        </Grid>
      ))}
    </>
  );
};

export default CoffeeList;