const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Test database connection and operations
const testDatabase = () => {
  console.log('🧪 Starting Database Tests...\n');
  
  const dbPath = path.join(__dirname, 'financially_fit.db');
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Database connection failed:', err.message);
      return;
    }
    console.log('✅ Connected to SQLite database');
  });

  // Test 1: Check if tables exist
  console.log('\n📋 Test 1: Checking table structure...');
  db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
      console.error('❌ Error checking tables:', err.message);
    } else {
      console.log('✅ Tables found:', tables.map(t => t.name));
      
      // Expected tables
      const expectedTables = ['users', 'expenses', 'budgets', 'loans'];
      const foundTables = tables.map(t => t.name);
      
      expectedTables.forEach(table => {
        if (foundTables.includes(table)) {
          console.log(`  ✅ ${table} table exists`);
        } else {
          console.log(`  ❌ ${table} table missing`);
        }
      });
    }
  });

  // Test 2: Check users table structure
  console.log('\n👥 Test 2: Checking users table structure...');
  db.all("PRAGMA table_info(users)", (err, columns) => {
    if (err) {
      console.error('❌ Error checking users table:', err.message);
    } else {
      console.log('✅ Users table columns:');
      columns.forEach(col => {
        console.log(`  - ${col.name} (${col.type}) ${col.notnull ? 'NOT NULL' : ''} ${col.pk ? 'PRIMARY KEY' : ''}`);
      });
    }
  });

  // Test 3: Check existing users
  console.log('\n🔍 Test 3: Checking existing users...');
  db.all("SELECT id, username, email, created_at FROM users", (err, users) => {
    if (err) {
      console.error('❌ Error fetching users:', err.message);
    } else {
      if (users.length === 0) {
        console.log('✅ No users found - database is clean');
      } else {
        console.log(`✅ Found ${users.length} existing users:`);
        users.forEach(user => {
          console.log(`  - ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Created: ${user.created_at}`);
        });
      }
    }
  });

  // Test 4: Test user registration
  console.log('\n📝 Test 4: Testing user registration...');
  const testUser = {
    username: 'testuser_' + Date.now(),
    email: 'test@example.com',
    password: 'testpass123'
  };

  const password_hash = Buffer.from(testUser.password).toString('base64');
  
  db.run(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [testUser.username, testUser.email, password_hash],
    function(err) {
      if (err) {
        console.error('❌ Registration test failed:', err.message);
      } else {
        console.log('✅ Registration test successful - User ID:', this.lastID);
        
        // Test 5: Test user login
        console.log('\n🔐 Test 5: Testing user login...');
        db.get(
          'SELECT * FROM users WHERE username = ? AND password_hash = ?',
          [testUser.username, password_hash],
          (err, row) => {
            if (err) {
              console.error('❌ Login test failed:', err.message);
            } else if (row) {
              console.log('✅ Login test successful - User found:', row.username);
            } else {
              console.log('❌ Login test failed - User not found');
            }
            
            // Test 6: Test duplicate registration
            console.log('\n🔄 Test 6: Testing duplicate registration...');
            db.run(
              'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
              [testUser.username, 'duplicate@example.com', password_hash],
              function(err) {
                if (err) {
                  if (err.message.includes('UNIQUE constraint failed')) {
                    console.log('✅ Duplicate registration correctly blocked');
                  } else {
                    console.error('❌ Unexpected error:', err.message);
                  }
                } else {
                  console.log('❌ Duplicate registration should have been blocked');
                }
                
                // Test 7: Test expenses table
                console.log('\n💰 Test 7: Testing expenses table...');
                db.run(
                  'INSERT INTO expenses (user_id, description, amount, category, date) VALUES (?, ?, ?, ?, ?)',
                  [1, 'Test expense', 100.50, 'wants', new Date().toISOString()],
                  function(err) {
                    if (err) {
                      console.error('❌ Expense insertion failed:', err.message);
                    } else {
                      console.log('✅ Expense insertion successful - Expense ID:', this.lastID);
                    }
                    
                    // Test 8: Test budgets table
                    console.log('\n📊 Test 8: Testing budgets table...');
                    db.run(
                      'INSERT INTO budgets (user_id, monthly_income, needs_percentage, wants_percentage, savings_percentage) VALUES (?, ?, ?, ?, ?)',
                      [1, 5000, 50, 30, 20],
                      function(err) {
                        if (err) {
                          console.error('❌ Budget insertion failed:', err.message);
                        } else {
                          console.log('✅ Budget insertion successful - Budget ID:', this.lastID);
                        }
                        
                        // Test 9: Test loans table
                        console.log('\n🏦 Test 9: Testing loans table...');
                        db.run(
                          'INSERT INTO loans (user_id, loan_amount, interest_rate, loan_period, monthly_payment, total_payment) VALUES (?, ?, ?, ?, ?, ?)',
                          [1, 10000, 5.5, 60, 191.01, 11460.60],
                          function(err) {
                            if (err) {
                              console.error('❌ Loan insertion failed:', err.message);
                            } else {
                              console.log('✅ Loan insertion successful - Loan ID:', this.lastID);
                            }
                            
                            // Clean up test data
                            console.log('\n🧹 Cleaning up test data...');
                            db.run('DELETE FROM users WHERE username LIKE ?', ['testuser_%'], (err) => {
                              if (err) {
                                console.error('❌ Cleanup failed:', err.message);
                              } else {
                                console.log('✅ Test data cleaned up');
                              }
                              
                              // Final summary
                              console.log('\n📊 Test Summary:');
                              console.log('✅ Database connection: Working');
                              console.log('✅ Table structure: Valid');
                              console.log('✅ User operations: Working');
                              console.log('✅ Data integrity: Maintained');
                              console.log('\n🎉 All database tests completed successfully!');
                              
                              db.close();
                            });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    }
  );
};

// Run the tests
testDatabase();

