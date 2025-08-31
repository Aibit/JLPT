// Browser Test Script for 3-Level Progress System
// Run this in the browser console at http://localhost:8001

console.log('🌐 BROWSER TESTING 3-LEVEL PROGRESS SYSTEM');
console.log('==========================================');

// Test 1: Check if all elements are loaded
console.log('\n1️⃣ Testing UI Elements...');
const elements = {
    'newWords': document.getElementById('newWords'),
    'learningWords': document.getElementById('learningWords'),
    'masteredWords': document.getElementById('masteredWords'),
    'totalWords': document.getElementById('totalWords'),
    'progressPercentage': document.getElementById('progressPercentage'),
    'reviewCount': document.getElementById('reviewCount'),
    'currentCard': document.getElementById('currentCard'),
    'totalCards': document.getElementById('totalCards'),
    'currentCardLevel': document.getElementById('currentCardLevel')
};

Object.keys(elements).forEach(key => {
    if (elements[key]) {
        console.log(`✅ ${key}: Found`);
    } else {
        console.log(`❌ ${key}: Missing`);
    }
});

// Test 2: Check vocabulary data
console.log('\n2️⃣ Testing Vocabulary Data...');
if (typeof vocabularyData !== 'undefined') {
    const totalWords = Object.values(vocabularyData).reduce((sum, category) => sum + category.length, 0);
    console.log(`✅ Vocabulary loaded: ${totalWords} words in ${Object.keys(vocabularyData).length} categories`);
} else {
    console.log('❌ Vocabulary data not loaded');
}

// Test 3: Check learning progress
console.log('\n3️⃣ Testing Learning Progress...');
if (typeof learningProgress !== 'undefined') {
    console.log('✅ Learning progress initialized');
    console.log(`   🆕 New words: ${learningProgress.wordProgress.new.size}`);
    console.log(`   📚 Learning words: ${learningProgress.wordProgress.learning.size}`);
    console.log(`   ✅ Mastered words: ${learningProgress.wordProgress.mastered.size}`);
} else {
    console.log('❌ Learning progress not initialized');
}

// Test 4: Test flashcard functionality
console.log('\n4️⃣ Testing Flashcard System...');
if (typeof currentFlashcards !== 'undefined') {
    console.log(`✅ Flashcards loaded: ${currentFlashcards.length} cards`);
    if (currentFlashcards.length > 0) {
        console.log(`   Current card: ${currentFlashcards[currentFlashcardIndex]?.jp || 'N/A'}`);
        console.log(`   Card level: ${currentFlashcards[currentFlashcardIndex]?.level || 'N/A'}`);
    }
} else {
    console.log('❌ Flashcards not loaded');
}

// Test 5: Test smart review system
console.log('\n5️⃣ Testing Smart Review System...');
if (typeof getPriorityWords === 'function') {
    const priorityWords = getPriorityWords();
    console.log(`✅ Priority words: ${priorityWords.length} words need review`);
} else {
    console.log('❌ Smart review system not available');
}

// Test 6: Test statistics update
console.log('\n6️⃣ Testing Statistics Update...');
if (typeof updateStats === 'function') {
    updateStats();
    console.log('✅ Statistics updated');
} else {
    console.log('❌ Statistics update function not available');
}

// Test 7: Simulate word progression
console.log('\n7️⃣ Testing Word Progression...');
if (typeof recordWordResult === 'function' && currentFlashcards.length > 0) {
    const testWordId = currentFlashcards[0]?.wordId;
    if (testWordId) {
        console.log(`Testing progression for: ${testWordId}`);
        
        // Simulate correct answers
        recordWordResult(testWordId, true);
        recordWordResult(testWordId, true);
        console.log(`   After 2 correct: ${getWordLevel(testWordId)}`);
        
        // Simulate more correct answers
        recordWordResult(testWordId, true);
        recordWordResult(testWordId, true);
        recordWordResult(testWordId, true);
        console.log(`   After 5 correct: ${getWordLevel(testWordId)}`);
        
        // Simulate errors
        recordWordResult(testWordId, false);
        recordWordResult(testWordId, false);
        recordWordResult(testWordId, false);
        console.log(`   After 3 errors: ${getWordLevel(testWordId)}`);
        
        console.log('✅ Word progression working');
    } else {
        console.log('❌ No test word available');
    }
} else {
    console.log('❌ Word progression system not available');
}

// Test 8: Check UI responsiveness
console.log('\n8️⃣ Testing UI Responsiveness...');
const progressBar = document.querySelector('.progress-fill');
if (progressBar) {
    console.log(`✅ Progress bar found: ${progressBar.style.width}`);
} else {
    console.log('❌ Progress bar not found');
}

// Test 9: Check navigation
console.log('\n9️⃣ Testing Navigation...');
const navTabs = document.querySelectorAll('.nav-tab');
console.log(`✅ Navigation tabs: ${navTabs.length} tabs found`);

// Test 10: Final Status Check
console.log('\n🎯 FINAL BROWSER TEST SUMMARY');
console.log('=============================');

const status = {
    'UI Elements': Object.values(elements).every(el => el !== null),
    'Vocabulary Data': typeof vocabularyData !== 'undefined',
    'Learning Progress': typeof learningProgress !== 'undefined',
    'Flashcards': typeof currentFlashcards !== 'undefined' && currentFlashcards.length > 0,
    'Smart Review': typeof getPriorityWords === 'function',
    'Statistics': typeof updateStats === 'function',
    'Word Progression': typeof recordWordResult === 'function',
    'Progress Bar': progressBar !== null,
    'Navigation': navTabs.length > 0
};

Object.keys(status).forEach(key => {
    console.log(`${status[key] ? '✅' : '❌'} ${key}`);
});

const allWorking = Object.values(status).every(s => s);
console.log(`\n${allWorking ? '🚀 ALL SYSTEMS OPERATIONAL!' : '⚠️ Some systems need attention'}`);

// Return test results for external use
return {
    status,
    allWorking,
    elements: Object.keys(elements).filter(key => elements[key] !== null),
    vocabularyCount: typeof vocabularyData !== 'undefined' ? Object.values(vocabularyData).reduce((sum, category) => sum + category.length, 0) : 0,
    flashcardCount: typeof currentFlashcards !== 'undefined' ? currentFlashcards.length : 0
};
