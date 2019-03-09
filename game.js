
                // global variables to track stuff and things
                var chosenCharacter= "";
                var currentEnemy;
                var defeatedEnemies = [];
                var characters = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle"];
                var characterImages = {
                    pikachu: "...",
                    bulbasaur: "...",
                    charmander: "...",
                    squirtle: "..."
                }
                var trainerName;
                var attackMultiplier;
                var counterAttackMultiplier;
                var attackingFlag = false;
                var characterHealth;
                var enemyHealth;

                //creating my characters as objects with properties
                //create variable for tracking defeated enemies
                //create multiplier for attack/character types
                //create objects (pikachu, squirtle, bulbasaur, charmander)
                //objects have health, array: attacks, object: primary attack(attack power, name, type), object: special attack (attack power, name, type), counter-attack //
                //(controlled for what is greater value- primary or special * multiplier), level, points, object: level ups (levels, level values, power values at level), speed, character types
                var characterObjects = {
                    pikachu: {
                        name: "Pikachu",
                        type: "electric",
                        healthPoints: 110,
                        damage: 0,
                        attacks: [
                            ["Tackle", 20, "regular"],
                            ["Shock", 15, "electric"]
                        ],
                    },
                    charmander: {
                        name: "Charmander",
                        type: "fire",
                        healthPoints: 120,
                        damage: 0,
                        attacks: [
                            ["Tackle", 20, "regular"],
                            ["Ember", 15, "fire"]
                        ],
                    },
                    bulbasaur: {
                        name: "Bulbasaur",
                        type: "earth",
                        healthPoints: 130,
                        damage: 0,
                        attacks: [
                            ["Tackle", 15, "regular"],
                            ["Sprout", 20, "earth"]
                        ],
                    },
                    squirtle: {
                        name: "Squirtle",
                        type: "water",
                        healthPoints: 125,
                        damage: 0,
                        attacks: [
                            ["Tackle", 10, "regular"],
                            ["Squirt", 20, "water"]
                        ],
                    }
                }

                //function for determining multiplier
                //positive conditions: water 2 fire, eletric to water, fire to earth
                //less positive conditions: earth 2 water
                //negative conditions: electric to earth, fire 2 water
                //called the function from console to unit test it returns a integer I expect
                function multiplierCalculate(attackerAttackType, defenderType) {
                    if (
                        (attackerAttackType === "water" && defenderType === "fire") ||
                        (attackerAttackType === "electric" && defenderType === "water") ||
                        (attackerAttackType === "fire" && defenderType === "earth")) {
                        return (2);
                    } else if ((attackerAttackType === "earth" && defenderType === "water")) {
                        return (1.5);
                    }
                    else if (
                        (attackerAttackType === "electric" && defenderType === "fire") ||
                        (attackerAttackType === "fire" && defenderType === "water")) {
                        return (.5);
                    }
                    else { return 1 }
                }
                function goToBattle() {
                    //change background image
                    //      -update display of character to include attacks, health, etc
                    //hide the character choice icons
                    //display fight icons

                    //two sections - col-6 of status updates: prompts for attack, then enemy attack and damage done (setTimeout = 3sec)

                    //========================
                    //minimum proof of concept
                    //push chosenCharacter and currentEnemy names to header
                    //push attack and health stats to header
                    //add buttons for primary attack and special attack with titles
                    //display fight choice footer
                    
                    $('#battleButtonElement').attr("style","display:none");
                   
                    $('#characterName').text(characterObjects[eval("'" + chosenCharacter + "'")].name);
                    $('#healthPointsRemaining').text(characterHealth);
                    $('#enemyName').text(characterObjects[eval("'" + currentEnemy + "'")].name);
                    $('#enemyHealthPointsRemaining').text(enemyHealth);
                    $('#primaryAttackFooter').append('<button id="primaryAttack" onclick="primaryAttack()" class="btn btn-danger">Tackle</button>');
                    $('#specialAttackFooter').append('<button id="specialAttack" onclick="specialAttack()" class="btn btn-danger">Special</button>');

                };

                function primaryAttack() {
                    if (!attackingFlag) {
                        attackingFlag = true;
                        var strength = characterObjects[eval("'" + chosenCharacter + "'")].attacks[0][1];
                        var type = characterObjects[eval("'" + chosenCharacter + "'")].attacks[0][2];
                        var name = characterObjects[eval("'" + chosenCharacter + "'")].attacks[0][0]
                        fight(name, strength, type)
                    } //else do nothing
                };

                function specialAttack() {
                    if (!attackingFlag) {
                        attackingFlag = true;
                        var strength = characterObjects[eval("'" + chosenCharacter + "'")].attacks[1][1];
                        var type = characterObjects[eval("'" + chosenCharacter + "'")].attacks[1][2];
                        var name = characterObjects[eval("'" + chosenCharacter + "'")].attacks[1][0]
                        fight(name, strength, type)
                    } //else do nothing
                };

                function fight(name, strength, type) {
                    //set a damageDone variable
                    //applies damageDone to enemy.damage
                    var damageDone = (strength * multiplierCalculate(type, characterObjects[eval("'" + currentEnemy + "'")].type));
                    characterObjects[eval("'" + currentEnemy + "'")].damage -= damageDone;
                    //      -increment enemy health points       
                    //this updates the footer message with the action of the character
                    $('#footerMessage').text(characterObjects[eval("'" + chosenCharacter + "'")].name + " attacked with " + name + " and did " + damageDone + " damage.");
                    //this sets a variable for health and updates the display for the enemy
                    var enemyHealth = (characterObjects[eval("'" + currentEnemy + "'")].healthPoints + characterObjects[eval("'" + currentEnemy + "'")].damage);
                    $('#enemyHealthPointsRemaining').text(enemyHealth);
                    //      -select attack for enemy
                    //      -increment chosen health points (-counter attack)
                    //I gotta do a timeout thing here

                    // var characterHealth;
                    var timesRun = 0;
                    var interval = setInterval(function () {
                        if (timesRun >= 1) {
                            clearInterval(interval);
                            endStateCheck();
                        }
                        else if (characterObjects[eval("'" + currentEnemy + "'")].attacks[0][1] > (characterObjects[eval("'" + currentEnemy + "'")].attacks[1][1] * multiplierCalculate(characterObjects[eval("'" + currentEnemy + "'")].attacks[1][2], characterObjects[eval("'" + chosenCharacter + "'")].type))) {
                            $('#footerMessage').text(characterObjects[eval("'" + currentEnemy + "'")].name + " attacked with " + characterObjects[eval("'" + currentEnemy + "'")].attacks[0][0] + " and did " + characterObjects[eval("'" + currentEnemy + "'")].attacks[0][1] + " damage.");
                            characterObjects[eval("'" + chosenCharacter + "'")].damage -= characterObjects[eval("'" + currentEnemy + "'")].attacks[0][1];
                        } else {
                            $('#footerMessage').text(characterObjects[eval("'" + currentEnemy + "'")].name + " attacked with " + characterObjects[eval("'" + currentEnemy + "'")].attacks[1][0] + " and did " + (characterObjects[eval("'" + currentEnemy + "'")].attacks[1][1] * multiplierCalculate(characterObjects[eval("'" + currentEnemy + "'")].attacks[1][2])) + " damage.");
                            characterObjects[eval("'" + chosenCharacter + "'")].damage -= characterObjects[eval("'" + currentEnemy + "'")].attacks[1][1] * multiplierCalculate(characterObjects[eval("'" + currentEnemy + "'")].attacks[1][2], characterObjects[eval("'" + chosenCharacter + "'")].type);
                        }

                        characterHealth = (characterObjects[eval("'" + chosenCharacter + "'")].healthPoints + characterObjects[eval("'" + chosenCharacter + "'")].damage);
                        $('#healthPointsRemaining').text(characterHealth);
                        timesRun++;
                    }, 2000);
                    //time interval for update back to ready state
                    //at all increment points compare health to zero - break;
                    var endCheckInterval = 0;
                    
                    function endStateCheck() {
                        var intervalEndCheck = setInterval(function () {


                            if (endCheckInterval === 1) {
                                clearInterval(intervalEndCheck);
                            } else {
                                if (characterHealth <= 0) {
                                    alert("Your Pokemon fainted... GameOver");
                                    $('#primaryAttack').attr("style","display:none");
                                    $('#specialAttack').attr("style","display:none");
                                }
                                else if (enemyHealth <= 0 && defeatedEnemies.length < 3) {
                                    defeatedEnemies.push(currentEnemy);
                                    $('#primaryAttack').attr("style","display:none");
                                    $('#specialAttack').attr("style","display:none");
                                    alert("Round Two");
                                    nextEnemy();

                                    
                                    //turn on enemy selection

                                } else if (enemyHealth <= 0 && defeatedEnemies.length == 3) {
                                    alert("You are a PokeMon Master!");
                                } else {
                                    attackingFlag = false;
                                    $('#footerMessage').text("What should your Character do?");
                                }
                                endCheckInterval++;
                            };

                        }, 2000);
                    };





                };

                function nextEnemy(){
                    characterHealth = characterHealth * 2
                    //hide current character card
                    $(eval("'[data-value=\"" + currentEnemy.toLowerCase() + "Enemy\"]'")).attr("style", "visibility: hidden");
                    //show non-defeated characters
                    //compare defeated array and characters array


                    characters.forEach(function (element) {
                        if ((currentEnemy.indexOf(element.toLowerCase()) < 0)) {
                            $(eval("'[data-value=\"" + element.toLowerCase() + "Enemy\"]'")).attr("style", "visibility: visible");
                        }
                    });
                }
         
                
$( document ).ready(function() {
//    //selection
                //    on hover event- tool tips for skills etc
           
                //    on click event- 

                $('.character').on("click",function () {
                    if(chosenCharacter==""){
                        chosenCharacter = this.getAttribute("value");
                        characterHealth = characterObjects[eval("'" + chosenCharacter + "'")].healthPoints;
                        characters.forEach(function (element) {
                            if (element.toLowerCase() != chosenCharacter) {
                                $(eval("'[data-value=\"" + element.toLowerCase() + "\"]'")).attr("style", "visibility: hidden");
                                // $(eval("'[value=\""+element.toLowerCase()+"\"]'")).attr("style", "visibility: hidden");
                            }
                            $('#enemySection').attr("style", "visibility: visible");
                        });
                        $(eval("'[data-value=\"" + chosenCharacter.toLowerCase() + "Enemy\"]'")).attr("style", "visibility: hidden");
                    }   
                });
                //    -set chosen character
                //    -update display for chosen character
                //    -update display to remove choice section
                //    -update display for enemy selection


                //    //enemy selection
                //      on hover event- tool tips for skills etc
                //      on click event- 
                //      -set first enemy
                //      -update display for first enemy

                $('.enemy').click(function () {
                    currentEnemy = this.getAttribute("value");
                    enemyHealth = characterObjects[eval("'" + currentEnemy + "'")].healthPoints;
                    console.log(currentEnemy);
                    characters.forEach(function (element) {
                        if (currentEnemy.indexOf(element.toLowerCase()) < 0) {
                            $(eval("'[data-value=\"" + element.toLowerCase() + "Enemy\"]'")).attr("style", "visibility: hidden");
                        }
                    });
                    $('#battleButton').html('<button style="margin: 2vh 10vw"id="battleButtonElement" onclick="goToBattle()" class="btn btn-primary">Battle!!</button>');
                });

                $('.battleButtonElement').click(function(){
                    goToBattle();
                });

                //    //fight
             





//    //end of fight
//      -add enemy to defeated enemies
//      -if last enemy check - if last enemy exit to game success message(end of game)
//      -round success message
//      -update points
//      -evaluate character level
//      -new powers message
//      -update display to choices screen (with choose enemies open- defeated enemies)
//      same on-click event for enemy selection
//      same enemy selection process

//    //end of game
//    -failure message- dead
//    -success message- winner!
});
