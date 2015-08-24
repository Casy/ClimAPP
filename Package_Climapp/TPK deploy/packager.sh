#!/bin/bash

function usage(){
    echo "Usage: pacakger folder tpk_name";
}

BASEDIR=$(dirname $0)
TPKDIR="$1"
TPKNAME="$2"
SRC_FOLDER=${1%/}

CURRDIR="$PWD"

if [ ! -d "$TPKDIR" ]; then
    echo "Invalid folder"
    usage
    exit -1
fi

if [ ! -f "$1/manifest.json" ]; then
    echo "Missing manifest"
    usage
    exit -1
fi

if [ -z $TPKNAME ]; then
    echo "Missing tpk name"
    usage
    exit -1
fi

if [ -z schemamanifest.json ]; then
    echo "WARNING: Missing schema, tpk would not be validated. Please place schemamanifest.json in the current folder."
fi

CHECK=$(validate-schema schemamanifest.json "$SRC_FOLDER/manifest.json")
if [ "$CHECK" != "$SRC_FOLDER/manifest.json is valid." ]; then
    echo "Invalid manifest.json"
    echo "$CHECK"

    //exit -1
fi


if [ ! ${TPKNAME: -4} == ".tpk" ]; then
    EXT=".tpk"
fi

cd "$SRC_FOLDER"; tar -cvzf "$CURRDIR/$TPKNAME$EXT" * && echo "$TPKNAME$EXT succesfully created!"

cd "$CURRDIR"
exit 0
