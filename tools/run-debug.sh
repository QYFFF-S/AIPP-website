docker run -it \
	--name='dev-node-qpod-pages' \
	--hostname='QPod-node' \
	-p 3000:3000 \
	-v $(pwd):/root/QPod.github.io \
	-w /root/QPod.github.io \
	qpod/node

