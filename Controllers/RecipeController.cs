using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessScriptWeb.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FitnessScriptWeb.Models;
using System.Net.Http;
using FitnessScriptWeb.Services;

namespace FitnessScriptWeb.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
    public class RecipeController : ControllerBase
    {
        private ApplicationDbContext _context;
        private static readonly IRecipeService _recipeService = new RecipeService();

        //Dependency inject within constructor
        public RecipeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Recipe
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> RetrieveData([FromBody] RecipeModel.DataFromJS data)
        {
            int caloriesMin = data.CaloriesMin, caloriesMax = data.CaloriesMax;
            string ingredients = data.Ingredients, healthRequirements = data.HealthRequirements;
            var recipes = await GetRecipe(ingredients, caloriesMin, caloriesMax);
            return recipes;
        }

        public async Task<IActionResult> GetRecipe(string ingredients, int caloriesMin, int caloriesMax)
        {
            List<RecipeModel.Recipe> recipies = await _recipeService.Recipes(ingredients, caloriesMin, caloriesMax);
            Console.WriteLine("");
            return Ok(new
            {
                Recipes = recipies
            });
        }

    }
}
