export default postSeeds = (users) => {
    const getRandomUserId = () => {
        return users[
            Math.floor(Math.random()*users.length)
        ]._id
    }

const postData = [
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "cat",
        "category": "toys",
        "condition": "like new",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "molestiae dicta voluptas ut iusto et hic nam",
                "userId": getRandomUserId(),
                "replies": [
                    {
                        "replyBody": "non exercitationem consequatur temporibus quia dicta id earum molestias voluptatibus et ut quia officiis dignissimos ex maxime sit voluptatem",
                        "userId": "Tyree17"
                    }
                ]
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "dog",
        "category": "furniture",
        "condition": "ugly",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "sapiente illo animi non et molestiae et blanditiis adipisci aut ut dolore",
                "userId": getRandomUserId(),
                "replies": []
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "rabbit / hamster",
        "category": "cleaning products",
        "condition": "okay",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "voluptas quis voluptates et laborum est facere et quia quasi cupiditate dolorem",
                "userId": getRandomUserId(),
                "replies": [
                    {
                        "replyBody": "facilis et ipsum",
                        "userId": getRandomUserId()
                    },
                    {
                        "replyBody": "qui non aut nam porro cum repellendus a et ab laboriosam autem error ut ex incidunt sed consequatur autem",
                        "userId": getRandomUserId()
                    }
                ]
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "fish",
        "category": "food",
        "condition": "new",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "sapiente illo animi non et molestiae et blanditiis adipisci aut ut dolore",
                "userId": getRandomUserId(),
                "replies": []
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "cat",
        "category": "outdoor",
        "condition": "like new",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "itaque distinctio sunt et autem saepe non officia consequuntur qui sit nesciunt rerum porro corrupti possimus praesentium voluptas dolore",
                "userId": getRandomUserId(),
                "replies": []
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "cat",
        "category": "toys",
        "condition": "like new",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "molestiae dicta voluptas ut iusto et hic nam",
                "userId": getRandomUserId(),
                "replies": [
                    {
                        "replyBody": "non exercitationem consequatur temporibus quia dicta id earum molestias voluptatibus et ut quia officiis dignissimos ex maxime sit voluptatem",
                        "userId": getRandomUserId()
                    }
                ]
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "dog",
        "category": "furniture",
        "condition": "ugly",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "sapiente illo animi non et molestiae et blanditiis adipisci aut ut dolore",
                "userId": getRandomUserId(),
                "replies": []
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "rabbit / hamster",
        "category": "cleaning products",
        "condition": "okay",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "voluptas quis voluptates et laborum est facere et quia quasi cupiditate dolorem",
                "userId": "Fern.Schiller",
                "replies": [
                    {
                        "replyBody": "facilis et ipsum",
                        "userId": getRandomUserId()
                    },
                    {
                        "replyBody": "qui non aut nam porro cum repellendus a et ab laboriosam autem error ut ex incidunt sed consequatur autem",
                        "userId": getRandomUserId()
                    }
                ]
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "fish",
        "category": "food",
        "condition": "new",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "sapiente illo animi non et molestiae et blanditiis adipisci aut ut dolore",
                "userId": getRandomUserId(),
                "replies": [
                    {
                        "replyBody": "facilis et ipsum",
                        "userId": getRandomUserId()
                    }
                ]
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "cat",
        "category": "outdoor",
        "condition": "like new",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "itaque distinctio sunt et autem saepe non officia consequuntur qui sit nesciunt rerum porro corrupti possimus praesentium voluptas dolore",
                "userId": getRandomUserId(),
                "replies": []
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "rabbit / hamster",
        "category": "cleaning products",
        "condition": "okay",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "voluptas quis voluptates et laborum est facere et quia quasi cupiditate dolorem",
                "userId": "Fern.Schiller",
                "replies": [
                    {
                        "replyBody": "facilis et ipsum",
                        "userId": getRandomUserId()
                    },
                    {
                        "replyBody": "qui non aut nam porro cum repellendus a et ab laboriosam autem error ut ex incidunt sed consequatur autem",
                        "userId": getRandomUserId()
                    }
                ]
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "fish",
        "category": "food",
        "condition": "new",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "sapiente illo animi non et molestiae et blanditiis adipisci aut ut dolore",
                "userId": getRandomUserId(),
                "replies": [
                    {
                        "replyBody": "facilis et ipsum",
                        "userId": getRandomUserId()
                    }
                ]
            }
        ]
    },
    {
        "postText": "Slightly used cat toy with String",
        "animalType": "cat",
        "category": "outdoor",
        "condition": "like new",
        "watching": [],
        "createdAt": [],
        "userId": getRandomUserId(),
        "comments": [
            {
                "commentBody": "itaque distinctio sunt et autem saepe non officia consequuntur qui sit nesciunt rerum porro corrupti possimus praesentium voluptas dolore",
                "userId": getRandomUserId(),
                "replies": []
            }
        ]
    }
]
return postData
};