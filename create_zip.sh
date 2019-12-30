dir=${PWD##*/}
ext=".zip"
zip -r $dir$ext . --exclude create_zip.sh --exclude images/ss*.png -x *.git* --exclude userscript/* && sync
