import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { List, Typography, Divider } from 'antd';
import './RecipeView.css';

export class RecipeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideRecipes: this.props.hideRecipes,
            recipe: this.props.recipeData
        };
    }

    renderRecipeView(recipe) {
        return (
            <div className="recipe-data">
                <img src={recipe.image} alt="icon" />
                <br />
                <p class="recipe-title">{recipe.label}</p>
                
                <Divider orientation="left">Recipe Ingredients</Divider>
                <List
                    bordered
                    dataSource={recipe.ingredientLines}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    render() {
        let renderRecipeView = this.renderRecipeView(this.state.recipe[0]);
        return (
            <div>
                {renderRecipeView}
            </div>
        );
    }
}
export default withRouter(RecipeView);

