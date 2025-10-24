#!/bin/bash

# Storybook Coverage Checker
# This script checks which components have stories and which are missing

echo "🔍 STORYBOOK COVERAGE ANALYSIS"
echo "=============================="
echo ""

# Find all component files (excluding stories, tests, and index files)
echo "📁 Finding all component files..."
COMPONENTS=$(find packages/ui/src -name "*.tsx" -not -name "*.stories.tsx" -not -name "*.test.tsx" -not -name "index.ts" | sort)

# Find all story files
echo "📚 Finding all story files..."
STORIES=$(find packages/ui/src -name "*.stories.tsx" | sort)

echo ""
echo "📊 COMPONENT ANALYSIS"
echo "===================="
echo ""

# Count components and stories
COMPONENT_COUNT=$(echo "$COMPONENTS" | wc -l)
STORY_COUNT=$(echo "$STORIES" | wc -l)

echo "Total Components: $COMPONENT_COUNT"
echo "Total Stories: $STORY_COUNT"
echo ""

# Check which components have stories
echo "✅ COMPONENTS WITH STORIES:"
echo "============================"
HAS_STORIES=0
MISSING_STORIES=0

for component in $COMPONENTS; do
    # Extract component name without path and extension
    component_name=$(basename "$component" .tsx)
    component_dir=$(dirname "$component")
    
    # Look for corresponding story file
    story_file="$component_dir/$component_name.stories.tsx"
    
    if [ -f "$story_file" ]; then
        echo "✅ $component_name"
        ((HAS_STORIES++))
    else
        echo "❌ $component_name (missing story)"
        ((MISSING_STORIES++))
    fi
done

echo ""
echo "📈 COVERAGE SUMMARY"
echo "=================="
echo "Components with stories: $HAS_STORIES"
echo "Components missing stories: $MISSING_STORIES"
echo ""

# Calculate coverage percentage
if [ $COMPONENT_COUNT -gt 0 ]; then
    COVERAGE=$((HAS_STORIES * 100 / COMPONENT_COUNT))
    echo "📊 Storybook Coverage: $COVERAGE%"
else
    echo "📊 Storybook Coverage: 0%"
fi

echo ""

# Show missing stories in detail
if [ $MISSING_STORIES -gt 0 ]; then
    echo "❌ MISSING STORIES:"
    echo "==================="
    for component in $COMPONENTS; do
        component_name=$(basename "$component" .tsx)
        component_dir=$(dirname "$component")
        story_file="$component_dir/$component_name.stories.tsx"
        
        if [ ! -f "$story_file" ]; then
            echo "Missing: $component"
        fi
    done
    echo ""
fi

# Check for orphaned stories (stories without components)
echo "🔍 CHECKING FOR ORPHANED STORIES:"
echo "=================================="
ORPHANED=0
for story in $STORIES; do
    story_name=$(basename "$story" .stories.tsx)
    story_dir=$(dirname "$story")
    component_file="$story_dir/$story_name.tsx"
    
    if [ ! -f "$component_file" ]; then
        echo "⚠️  Orphaned story: $story"
        ((ORPHANED++))
    fi
done

if [ $ORPHANED -eq 0 ]; then
    echo "✅ No orphaned stories found"
else
    echo "⚠️  Found $ORPHANED orphaned stories"
fi

echo ""

# Show story organization
echo "📚 STORY ORGANIZATION:"
echo "======================"
echo "Stories by category:"
echo ""

# Group stories by directory
for story in $STORIES; do
    story_dir=$(dirname "$story" | sed 's|packages/ui/src/||')
    story_name=$(basename "$story" .stories.tsx)
    echo "  $story_dir/$story_name"
done

echo ""
echo "🎯 RECOMMENDATIONS:"
echo "==================="

if [ $MISSING_STORIES -gt 0 ]; then
    echo "1. Create stories for missing components:"
    for component in $COMPONENTS; do
        component_name=$(basename "$component" .tsx)
        component_dir=$(dirname "$component")
        story_file="$component_dir/$component_name.stories.tsx"
        
        if [ ! -f "$story_file" ]; then
            echo "   - $component"
        fi
    done
    echo ""
fi

if [ $COVERAGE -lt 80 ]; then
    echo "2. ⚠️  Low coverage ($COVERAGE%). Consider adding more stories."
elif [ $COVERAGE -lt 100 ]; then
    echo "2. 📈 Good coverage ($COVERAGE%). Almost complete!"
else
    echo "2. 🎉 Perfect coverage (100%)! All components have stories."
fi

echo ""
echo "3. Run 'yarn workspace @gotmusic/ui storybook:dev' to view stories"
echo "4. Use 'yarn workspace @gotmusic/ui storybook:build' to build for production"

echo ""
echo "✅ Analysis complete!"
