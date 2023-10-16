import {MongoDBInfrastructure} from "./infrastructures/mongodb/infrastructure";

const main = async () =>{
    const xaps = new MongoDBInfrastructure()

    await xaps.getClient()
    console.log("xups")
}


main().catch(console.error)