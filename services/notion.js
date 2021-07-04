const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

// Init client
const notion = new Client({
  auth: 'secret_QmXiYpRxYTbiSSbc8boHg940k7zRfDeVPku6ACQ2KDJ',
})

const database_id = '82b21024-8c47-4784-bc75-c2a5a03f00be'

module.exports = async function getVideos() {
  const payload = {
    path: `databases/${database_id}/query`,
    method: 'POST',
  }

  const { results } = await notion.request(payload)

  const videos = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      date: page.properties.Date.date.start,
      tags: page.properties.Tags.rich_text[0].text.content,
      description: page.properties.Description.rich_text[0].text.content,

    }
  })

  return videos
}
