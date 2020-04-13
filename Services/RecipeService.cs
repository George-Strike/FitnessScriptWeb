using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using FitnessScriptWeb.Models;
using Newtonsoft.Json;

namespace FitnessScriptWeb.Services
{
    public interface IRecipeService
    {
        Task<List<RecipeModel.Recipe>> Recipes(string ingredients, int caloriesMin, int caloriesMax);
    }

    public class RecipeService : IRecipeService
    {
        HttpClient _client;
        public RecipeService()
        {
            _client = new HttpClient();
        }

        public async Task<List<RecipeModel.Recipe>> Recipes(string ingredients, int caloriesMin, int caloriesMax)
        {
            var recipies = await RequestRecipes(ingredients, caloriesMin, caloriesMax);
            Console.WriteLine("");

            return recipies;
        }

        private async Task<List<RecipeModel.Recipe>> RequestRecipes(string ingredients, int caloriesMin, int caloriesMax)
        {
            if (_client.BaseAddress == null)
            {
                _client.BaseAddress = new Uri("https://api.edamam.com");
            }

            RecipeModel.RootObject rootObject = null;
            string address = $"/search?q={ingredients}&app_id=&app_key=&calories={caloriesMin}-{caloriesMax}";
            HttpResponseMessage response = await _client.GetAsync(address);
            List<RecipeModel.Recipe> recipesList = new List<RecipeModel.Recipe>();

            if (response.IsSuccessStatusCode)
            {
                var recipeContent = await response.Content.ReadAsStringAsync();
                rootObject = JsonConvert.DeserializeObject<RecipeModel.RootObject>(recipeContent);
                //List<Hit> d = JsonConvert.DeserializeObject<List<Hit>>(recipeContent);
                Console.WriteLine("");
            }

            rootObject.hits.ForEach(x => recipesList.Add(x.recipe));

            return recipesList;
        }
    }
}
