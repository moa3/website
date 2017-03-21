# Run dev server

docker run --rm -it -v $PWD:/src -p 1313:1313 -u hugo jguyomard/hugo-builder:0.19 hugo server --bind 0.0.0.0

Go to http://localhost:1313

# Build site

docker run --rm -it -v $PWD:/src -u hugo jguyomard/hugo-builder:0.19 hugo

# Deploy

scp -r public/* fablab@rapadura:site/
