#!/bin/sh
# Make a folder for images
mkdir public/assets/articles/$1

# make a markdown file with frontmatter
file="src/_articles/$1.md"
now=$(date +%F)
echo "---" > $file
echo "title: " >> $file
echo "createdAt: "$now"" >> $file
echo "tags: [""]" >> $file
echo "thumbnail: "/assets/articles/$1/thumbnail.jpg"" >> $file
echo '---' >> $file
cat $file