//login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    // Example user data stored in localStorage for demo purposes
    // In real applications, authentication should be done on the server side
    if (!localStorage.getItem('users')) {
        const users = [
            { username: 'user1', password: 'password1' },
            { username: 'user2', password: 'password2' },
            { username: 'jovenal', password: '12345' }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        if (!username || !password) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Please enter both username and password.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Login successful! Redirecting...';

            // Store user session
            localStorage.setItem('currentUser', username);
            sessionStorage.setItem('isLoggedIn', 'true');

            // Redirect to profile page after a short delay (default landing page)
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1000);
        } else {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Invalid username or password.';
        }
    });
});


//forgot pass
document.getElementById('forgotPassword').addEventListener('click', function(event) {
    event.preventDefault();
    const username = prompt('Please enter your username for password reset:');
    if (!username) {
        alert('Username is required for password reset.');
        return;
    }
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username);
    if (user) {
        alert(`Password for ${username}: ${user.password}\n\nNote: This is for testing purposes only.`);
    } else {
        alert('Username not found.');
    }
});

// Menu functionality
document.addEventListener('DOMContentLoaded', () => {
    // Menu navigation
    const menuButtons = document.querySelectorAll('.menu-btn');
    const contentSections = document.querySelectorAll('.content-section');

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // Remove active class from all menu buttons
            menuButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));

            // Show target section
            document.getElementById(`${targetSection}-section`).classList.add('active');
        });
    });

    // Settings buttons functionality
    const settingsButtons = document.querySelectorAll('.settings-btn');
    settingsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            switch(buttonText) {
                case 'Change Password':
                    alert('Password change functionality would be implemented here.');
                    break;
                case 'Update Profile':
                    alert('Profile update functionality would be implemented here.');
                    break;
                case 'Preferences':
                    alert('Preferences functionality would be implemented here.');
                    break;
                case 'Notifications':
                    alert('Notifications settings would be implemented here.');
                    break;
            }
        });
    });

    // Action buttons functionality
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            switch(buttonText) {
                case 'Manage Products':
                    showProductManagement();
                    break;
                case 'View Inventory':
                    alert('Inventory view functionality would be implemented here.');
                    break;
            }
        });
    });

    // Category filtering functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');

            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Filter products
            filterProductsByCategory(selectedCategory);
        });
    });

    // Collapsible category menu functionality
    const categoryHeader = document.getElementById('categoryHeader');
    const categoryTabsContainer = document.getElementById('categoryTabs');

    if (categoryHeader && categoryTabsContainer) {
        categoryHeader.addEventListener('click', function() {
            // Toggle collapsed state
            categoryHeader.classList.toggle('collapsed');

            // Toggle visibility of category tabs
            categoryTabsContainer.classList.toggle('hidden');

            // Update toggle arrow
            const toggleArrow = categoryHeader.querySelector('.category-toggle');
            if (categoryHeader.classList.contains('collapsed')) {
                toggleArrow.textContent = '▶';
            } else {
                toggleArrow.textContent = '▼';
            }
        });
    }

    // Filter products by category
    function filterProductsByCategory(category) {
        const productCards = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        productCards.forEach(card => {
            const productCategory = card.getAttribute('data-category');

            if (category === 'all' || productCategory === category) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show message if no products found
        if (visibleCount === 0) {
            showNoProductsMessage(category);
        } else {
            hideNoProductsMessage();
        }
    }



    // Show no products message
    function showNoProductsMessage(category) {
        let messageContainer = document.getElementById('noProductsMessage');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'noProductsMessage';
            messageContainer.style.cssText = `
                text-align: center;
                padding: 40px 20px;
                color: #666;
                font-size: 16px;
                background: #f8f9fa;
                border-radius: 10px;
                margin: 20px 0;
            `;
            document.getElementById('productsGrid').appendChild(messageContainer);
        }

        const categoryName = getCategoryDisplayName(category);
        messageContainer.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 15px;">📦</div>
            <h4 style="color: #333; margin-bottom: 10px;">No Products Found</h4>
            <p>No products available in the <strong>${categoryName}</strong> category.</p>
            <p style="color: #888; font-size: 14px;">Try selecting a different category or add new products.</p>
        `;
    }

    // Hide no products message
    function hideNoProductsMessage() {
        const messageContainer = document.getElementById('noProductsMessage');
        if (messageContainer) {
            messageContainer.remove();
        }
    }

    // Get category display name
    function getCategoryDisplayName(category) {
        const categoryNames = {
            'all': 'All Categories',
            'snacks': 'Snacks',
            'dairy': 'Dairy',
            'frozen': 'Frozen Food',
            'household': 'Household',
            'canned': 'Canned Food',
            'drinks': 'Drinks'
        };
        return categoryNames[category] || category;
    }

    // Product management functionality
    function showProductManagement() {
        document.getElementById('productsOverview').style.display = 'none';
        document.getElementById('productsManagement').style.display = 'block';
    }

    // Back to overview button
    document.getElementById('backToOverview').addEventListener('click', function() {
        document.getElementById('productsManagement').style.display = 'none';
        document.getElementById('productsOverview').style.display = 'block';
    });

    // Add new product button
    document.getElementById('addProductBtn').addEventListener('click', function() {
        showAddProductModal();
    });

    // Show add product modal
    function showAddProductModal() {
        const productName = prompt('Enter product name:');
        const category = prompt('Enter category:');
        const stock = prompt('Enter stock level:');
        const expiryDate = prompt('Enter expiration date (YYYY-MM-DD):');

        if (productName && category && stock && expiryDate) {
            addProductToTable(productName, category, parseInt(stock), expiryDate);
            alert('Product added successfully!');
        } else {
            alert('All fields are required.');
        }
    }

    // Add product to table
    function addProductToTable(name, category, stock, expiryDate) {
        const tableBody = document.getElementById('productsTableBody');
        const status = getStockStatus(stock, expiryDate);
        const statusBadge = getStatusBadge(status);

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${category}</td>
            <td><span class="stock-indicator ${status}">${stock}</span></td>
            <td><span class="status-badge ${status}">${statusBadge}</span></td>
            <td>${expiryDate}</td>
            <td>
                <button class="table-btn edit" onclick="editProduct(this)">Edit</button>
                <button class="table-btn delete" onclick="deleteProduct(this)">Delete</button>
            </td>
        `;

        tableBody.appendChild(newRow);
        updateProductStats();
    }

    // Get stock status based on stock level and expiry date
    function getStockStatus(stock, expiryDate) {
        const today = new Date();
        const expiry = new Date(expiryDate);

        if (expiry < today) {
            return 'expired';
        } else if (stock <= 5) {
            return 'low';
        } else {
            return 'good';
        }
    }

    // Get status badge text
    function getStatusBadge(status) {
        switch(status) {
            case 'good': return 'In Stock';
            case 'low': return 'Low Stock';
            case 'expired': return 'Expired';
            default: return 'Unknown';
        }
    }

    // Edit product function
    window.editProduct = function(button) {
        const row = button.closest('tr');
        const cells = row.querySelectorAll('td');
        const productName = cells[0].textContent;
        const category = cells[1].textContent;
        const stockElement = cells[2].querySelector('.stock-indicator');
        const stock = parseInt(stockElement.textContent);
        const expiryDate = cells[4].textContent;

        const newStock = prompt(`Edit stock level for ${productName}:`, stock);
        const newExpiryDate = prompt(`Edit expiration date for ${productName} (YYYY-MM-DD):`, expiryDate);

        if (newStock !== null && newExpiryDate) {
            const status = getStockStatus(parseInt(newStock), newExpiryDate);
            const statusBadge = getStatusBadge(status);

            stockElement.textContent = newStock;
            stockElement.className = `stock-indicator ${status}`;
            cells[3].innerHTML = `<span class="status-badge ${status}">${statusBadge}</span>`;
            cells[4].textContent = newExpiryDate;

            updateProductStats();
            alert('Product updated successfully!');
        }
    };

    // Delete product function
    window.deleteProduct = function(button) {
        if (confirm('Are you sure you want to delete this product?')) {
            const row = button.closest('tr');
            row.remove();
            updateProductStats();
            alert('Product deleted successfully!');
        }
    };

    // Update product statistics
    function updateProductStats() {
        const tableRows = document.querySelectorAll('#productsTableBody tr');
        const totalProducts = tableRows.length;

        let inStock = 0;
        let lowStock = 0;
        let expired = 0;

        tableRows.forEach(row => {
            const statusElement = row.querySelector('.status-badge');
            const status = statusElement.classList[1]; // Get the status class

            switch(status) {
                case 'in-stock': inStock++; break;
                case 'low-stock': lowStock++; break;
                case 'expired': expired++; break;
            }
        });

        // Update stat cards
        document.querySelector('.stat-number').textContent = totalProducts;
        document.querySelectorAll('.stat-number')[1].textContent = inStock;
        document.querySelectorAll('.stat-number')[2].textContent = lowStock;
        document.querySelectorAll('.stat-number')[3].textContent = expired;
    }
});

// Navigation function for separate pages
function navigateTo(page) {
    const pageMap = {
        'profile': 'profile.html',
        'products': 'products.html',
        'analytics': 'analytics.html',
        'inventory': 'inventory.html',
        'settings': 'settings.html'
    };

    if (pageMap[page]) {
        window.location.href = pageMap[page];
    } else {
        console.error('Page not found:', page);
    }
}

// Profile page functions
function editProfile() {
    const newName = prompt('Enter your full name:', 'Administrator User');
    const newEmail = prompt('Enter your email:', 'admin@tindahan.com');
    const newPhone = prompt('Enter your phone number:', '+63 912 345 6789');

    if (newName && newEmail && newPhone) {
        // Update the display values
        document.querySelector('.profile-info h4').textContent = newName;
        document.querySelectorAll('.info-value')[1].textContent = newName;
        document.querySelectorAll('.info-value')[2].textContent = newEmail;
        document.querySelectorAll('.info-value')[3].textContent = newPhone;

        alert('Profile updated successfully!');
    }
}

function changePassword() {
    const currentPassword = prompt('Enter current password:');
    const newPassword = prompt('Enter new password:');
    const confirmPassword = prompt('Confirm new password:');

    if (currentPassword && newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
            alert('Password changed successfully!');
        } else {
            alert('New passwords do not match. Please try again.');
        }
    }
}

function viewActivity() {
    alert('Activity Log:\n\n• Updated product inventory (2 hours ago)\n• Generated sales report (4 hours ago)\n• Added new product category (6 hours ago)\n• Modified system settings (1 day ago)\n• Login from new device (2 days ago)');
}

// Analytics page functions
function generateReport() {
    alert('📄 Report Generated Successfully!\n\nReport includes:\n• Sales summary for the current period\n• Top performing products\n• Customer analytics\n• Inventory turnover rates\n\nThe report has been saved to your downloads folder.');
}

function exportData() {
    alert('📊 Data Export Started!\n\nExporting:\n• Sales data (CSV format)\n• Customer information\n• Product inventory\n• Transaction history\n\nExport will be available in your downloads folder shortly.');
}

function viewDetails() {
    alert('📋 Detailed Analytics View\n\nThis would open a detailed analytics dashboard with:\n• Interactive charts and graphs\n• Real-time data updates\n• Advanced filtering options\n• Comparative analysis tools\n• Export functionality for each section');
}

// Inventory page functions
function restockItem(itemName) {
    const quantity = prompt(`Enter quantity to restock for ${itemName}:`, '10');
    if (quantity && parseInt(quantity) > 0) {
        alert(`✅ ${quantity} units of ${itemName} have been added to the restock list.\n\nThe warehouse team has been notified.`);
    }
}

function removeExpired(itemName) {
    if (confirm(`Are you sure you want to remove expired ${itemName} from inventory?`)) {
        alert(`🗑️ ${itemName} has been removed from inventory.\n\n• Items disposed of safely\n• Inventory records updated\n• Loss recorded in system`);
    }
}

function checkExpiry(itemName) {
    alert(`⏰ Expiry Check: ${itemName}\n\n• Current stock: 15 units\n• Expiry date: 2024-01-22\n• Days until expiry: 7 days\n• Status: Monitor closely\n\nRecommendation: Consider promotional pricing to clear stock.`);
}

function viewFullInventory() {
    alert('📋 Full Inventory View\n\nThis would open the complete inventory management system with:\n• All product listings\n• Advanced search and filtering\n• Bulk operations\n• Inventory valuation\n• Stock movement history');
}

function addNewItem() {
    const itemName = prompt('Enter new item name:');
    const category = prompt('Enter category:');
    const quantity = prompt('Enter initial quantity:');
    const price = prompt('Enter unit price:');

    if (itemName && category && quantity && price) {
        alert(`✅ New item added successfully!\n\nItem: ${itemName}\nCategory: ${category}\nQuantity: ${quantity}\nPrice: ₱${price}\n\nThe item is now available in the inventory system.`);
    } else {
        alert('All fields are required to add a new item.');
    }
}

function generateInventoryReport() {
    alert('📄 Inventory Report Generated!\n\nReport includes:\n• Current stock levels by category\n• Items requiring restock\n• Expired items list\n• Inventory valuation\n• Stock movement summary\n\nReport saved to your downloads folder.');
}

function scanInventory() {
    alert('📱 Inventory Scan Initiated!\n\n• Scanning all storage locations\n• Updating stock counts\n• Checking for discrepancies\n• Generating scan report\n\nThis process may take a few minutes. You will be notified when complete.');
}

// Settings page functions
function openModal(modalType) {
    const modal = document.getElementById('settingsModal');
    const modalContent = document.getElementById('modalContent');

    let content = '';

    switch(modalType) {
        case 'changePassword':
            content = `
                <h3>🔐 Change Password</h3>
                <div class="modal-form">
                    <div class="form-group">
                        <label>Current Password:</label>
                        <input type="password" id="currentPass" placeholder="Enter current password">
                    </div>
                    <div class="form-group">
                        <label>New Password:</label>
                        <input type="password" id="newPass" placeholder="Enter new password">
                    </div>
                    <div class="form-group">
                        <label>Confirm Password:</label>
                        <input type="password" id="confirmPass" placeholder="Confirm new password">
                    </div>
                    <div class="modal-actions">
                        <button onclick="changePasswordModal()">Update Password</button>
                        <button onclick="closeModal()">Cancel</button>
                    </div>
                </div>
            `;
            break;

        case 'updateProfile':
            content = `
                <h3>✏️ Update Profile</h3>
                <div class="modal-form">
                    <div class="form-group">
                        <label>Full Name:</label>
                        <input type="text" id="fullName" placeholder="Enter full name" value="Administrator User">
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" id="email" placeholder="Enter email" value="admin@tindahan.com">
                    </div>
                    <div class="form-group">
                        <label>Phone:</label>
                        <input type="tel" id="phone" placeholder="Enter phone number" value="+63 912 345 6789">
                    </div>
                    <div class="modal-actions">
                        <button onclick="updateProfileModal()">Update Profile</button>
                        <button onclick="closeModal()">Cancel</button>
                    </div>
                </div>
            `;
            break;

        case 'accountSecurity':
            content = `
                <h3>🛡️ Account Security</h3>
                <div class="security-options">
                    <div class="security-item">
                        <span>Two-Factor Authentication</span>
                        <button onclick="toggle2FA()">Enable</button>
                    </div>
                    <div class="security-item">
                        <span>Login Notifications</span>
                        <button onclick="toggleNotifications()">Enabled</button>
                    </div>
                    <div class="security-item">
                        <span>Session Timeout</span>
                        <button onclick="setSessionTimeout()">30 minutes</button>
                    </div>
                    <div class="security-item">
                        <span>Password Expiry</span>
                        <button onclick="setPasswordExpiry()">90 days</button>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
            break;

        case 'notificationSettings':
            content = `
                <h3>🔔 Notification Settings</h3>
                <div class="notification-options">
                    <div class="notification-item">
                        <label>
                            <input type="checkbox" checked> Low stock alerts
                        </label>
                    </div>
                    <div class="notification-item">
                        <label>
                            <input type="checkbox" checked> Expiry notifications
                        </label>
                    </div>
                    <div class="notification-item">
                        <label>
                            <input type="checkbox" checked> Sales reports
                        </label>
                    </div>
                    <div class="notification-item">
                        <label>
                            <input type="checkbox"> Marketing emails
                        </label>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="saveNotificationSettings()">Save Settings</button>
                    <button onclick="closeModal()">Cancel</button>
                </div>
            `;
            break;

        case 'storeInfo':
            content = `
                <h3>📍 Store Information</h3>
                <div class="modal-form">
                    <div class="form-group">
                        <label>Store Name:</label>
                        <input type="text" value="TINDAHAN Store" id="storeName">
                    </div>
                    <div class="form-group">
                        <label>Address:</label>
                        <textarea id="storeAddress">123 Main Street, Business District</textarea>
                    </div>
                    <div class="form-group">
                        <label>Contact Number:</label>
                        <input type="tel" value="+63 912 345 6789" id="storeContact">
                    </div>
                    <div class="modal-actions">
                        <button onclick="saveStoreInfo()">Save Changes</button>
                        <button onclick="closeModal()">Cancel</button>
                    </div>
                </div>
            `;
            break;

        case 'businessHours':
            content = `
                <h3>🕒 Business Hours</h3>
                <div class="hours-grid">
                    <div class="hour-item">
                        <label>Monday - Friday:</label>
                        <input type="text" value="8:00 AM - 8:00 PM" id="weekdayHours">
                    </div>
                    <div class="hour-item">
                        <label>Saturday:</label>
                        <input type="text" value="8:00 AM - 9:00 PM" id="saturdayHours">
                    </div>
                    <div class="hour-item">
                        <label>Sunday:</label>
                        <input type="text" value="9:00 AM - 7:00 PM" id="sundayHours">
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="saveBusinessHours()">Save Hours</button>
                    <button onclick="closeModal()">Cancel</button>
                </div>
            `;
            break;

        case 'lowStockAlerts':
            content = `
                <h3>⚠️ Low Stock Alerts</h3>
                <div class="alert-settings">
                    <div class="setting-item">
                        <label>Alert Threshold:</label>
                        <select id="alertThreshold">
                            <option value="5">5 items or less</option>
                            <option value="10" selected>10 items or less</option>
                            <option value="15">15 items or less</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" checked id="emailAlerts"> Email notifications
                        </label>
                    </div>
                    <div class="setting-item">
                        <label>
                            <input type="checkbox" id="pushAlerts"> Push notifications
                        </label>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="saveAlertSettings()">Save Settings</button>
                    <button onclick="closeModal()">Cancel</button>
                </div>
            `;
            break;

        case 'backupData':
            content = `
                <h3>💾 Backup & Restore</h3>
                <div class="backup-options">
                    <div class="backup-info">
                        <p><strong>Last Backup:</strong> Today, 2:30 AM</p>
                        <p><strong>Next Scheduled:</strong> Tomorrow, 2:30 AM</p>
                        <p><strong>Storage Used:</strong> 2.4 GB / 10 GB</p>
                    </div>
                    <div class="backup-actions">
                        <button onclick="createBackup()">🔄 Create Backup Now</button>
                        <button onclick="scheduleBackup()">📅 Schedule Backup</button>
                        <button onclick="restoreBackup()">📥 Restore from Backup</button>
                    </div>
                </div>
                <div class="modal-actions">
                    <button onclick="closeModal()">Close</button>
                </div>
            `;
            break;

        default:
            content = `<h3>Settings</h3><p>Feature coming soon...</p>`;
    }

    modalContent.innerHTML = content;
    modal.style.display = 'flex';
    // Add active class after a brief delay to trigger animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('settingsModal');
    modal.classList.remove('active');
    // Reset display after animation completes
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function changePasswordModal() {
    const currentPass = document.getElementById('currentPass').value;
    const newPass = document.getElementById('newPass').value;
    const confirmPass = document.getElementById('confirmPass').value;

    if (!currentPass || !newPass || !confirmPass) {
        alert('Please fill in all fields.');
        return;
    }

    if (newPass === confirmPass) {
        alert('Password changed successfully!');
        closeModal();
    } else {
        alert('New passwords do not match. Please try again.');
    }
}

function updateProfileModal() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (fullName && email && phone) {
        alert('Profile updated successfully!');
        closeModal();
    } else {
        alert('Please fill in all fields.');
    }
}

function toggle2FA() {
    alert('Two-Factor Authentication enabled!\n\nYou will now be required to enter a verification code sent to your email for enhanced security.');
}

function toggleNotifications() {
    alert('Login notifications are now enabled.\n\nYou will receive email notifications for new login attempts from unrecognized devices.');
}

function setSessionTimeout() {
    alert('Session timeout set to 30 minutes.\n\nYou will be automatically logged out after 30 minutes of inactivity.');
}

function setPasswordExpiry() {
    alert('Password expiry set to 90 days.\n\nYou will be required to change your password every 90 days for security.');
}

function saveNotificationSettings() {
    alert('Notification settings saved successfully!');
    closeModal();
}

function saveStoreInfo() {
    alert('Store information updated successfully!');
    closeModal();
}

function saveBusinessHours() {
    alert('Business hours updated successfully!');
    closeModal();
}

function saveAlertSettings() {
    alert('Alert settings saved successfully!');
    closeModal();
}

function createBackup() {
    alert('🔄 Creating backup...\n\nThis may take a few minutes. You will be notified when the backup is complete.');
}

function scheduleBackup() {
    alert('📅 Backup scheduled for tomorrow at 2:30 AM.\n\nYou will receive a notification when the backup is complete.');
}

function restoreBackup() {
    if (confirm('Are you sure you want to restore from the latest backup? This will overwrite current data.')) {
        alert('📥 Restoring from backup...\n\nThis process may take several minutes. The system will be temporarily unavailable during restoration.');
    }
}

//logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Confirm logout
    if (confirm('Are you sure you want to logout?')) {
        // Clear session data
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('isLoggedIn');

        // Redirect to login page
        window.location.href = 'login.html';
    }
});

// Category scroll functionality
document.addEventListener('DOMContentLoaded', () => {
    const categoryTabs = document.getElementById('categoryTabs');
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    const scrollDownBtn = document.getElementById('scrollDownBtn');

    if (categoryTabs && scrollUpBtn && scrollDownBtn) {
        const scrollAmount = 200; // Amount to scroll in pixels

        // Scroll up functionality
        scrollUpBtn.addEventListener('click', function() {
            categoryTabs.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Scroll down functionality
        scrollDownBtn.addEventListener('click', function() {
            categoryTabs.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button visibility based on scroll position
        function updateScrollButtons() {
            const scrollLeft = categoryTabs.scrollLeft;
            const scrollWidth = categoryTabs.scrollWidth;
            const clientWidth = categoryTabs.clientWidth;

            // Show/hide scroll up button
            if (scrollLeft > 0) {
                scrollUpBtn.classList.remove('hidden');
            } else {
                scrollUpBtn.classList.add('hidden');
            }

            // Show/hide scroll down button
            if (scrollLeft < scrollWidth - clientWidth - 1) {
                scrollDownBtn.classList.remove('hidden');
            } else {
                scrollDownBtn.classList.add('hidden');
            }
        }

        // Update button visibility on scroll
        categoryTabs.addEventListener('scroll', updateScrollButtons);

        // Initial button visibility check
        updateScrollButtons();

        // Update button visibility on window resize
        window.addEventListener('resize', updateScrollButtons);
    }
});
