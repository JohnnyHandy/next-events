#!/bin/bash

echo "CI VARIABLE: $CI"

if [[ "$CI" == "1"]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi