json.array!(@stories) do |story|
  json.extract! story, :name, :content, :origin, :destination, :orLat, :orLng, :desLat, :desLng
  json.url story_url(story, format: :json)
end
