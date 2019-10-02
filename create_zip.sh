dir=${PWD##*/}
ext=".zip"
zip -r $dir$ext . --exclude create_zip.sh && sync
