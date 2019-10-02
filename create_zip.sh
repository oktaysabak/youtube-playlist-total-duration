dir=${PWD##*/}
ext=".zip"
zip -r $dir$ext . && sync
