export default {
    metods: {
        groupIngredients(ingredients){
            let grouped = [];
            for(let i = 0; i < ingredients.length; i++){
                let newIngredient = true;
                for (let j = 0; j < grouped.length; j++){
                    if (ingredients[i].ingredient_id === gropued[j].ingredient_id){
                        grouped[j].count += 1;
                        newIngredient = false;
                        break;
                    }
                }
                if (newIngredient)
                    grouped.push({ing: ingredients [i], count: 1});
            }
            return grouped;
        }

    }
}