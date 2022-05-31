#!/bin/bash

rm -rf dist
mkdir dist

cp index.html ./dist

cp -a class ./dist
cp -a css ./dist
cp -a img ./dist
cp -a js ./dist
cp -a service ./dist
cp -a suscribe ./dist