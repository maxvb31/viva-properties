import client, { SanityClient } from "@sanity/client"

export default SanityClient({
    projectId: "7wz6aui0",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-08-05"
})