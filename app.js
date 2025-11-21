// app.js - Complete Firebase integration
class BloodDonorApp {
    constructor() {
        this.init();
    }

    init() {
        this.loadDonors();
        this.setupEventListeners();
    }

    // রিয়েল-টাইম ডাটা লোড করা
    loadDonors() {
        const donorsRef = database.ref('donors');
        
        donorsRef.on('value', (snapshot) => {
            const donors = snapshot.val();
            this.displayDonors(donors);
        });
    }

    // ডাটা display করা
    displayDonors(donors) {
        const donorList = document.getElementById('donorList');
        if (!donorList) return;

        donorList.innerHTML = '';

        if (!donors) {
            donorList.innerHTML = '<p>কোনো ডোনার পাওয়া যায়নি</p>';
            return;
        }

        for (let donorId in donors) {
            const donor = donors[donorId];
            donorList.innerHTML += `
                <div class="donor-card" style="border: 1px solid #ddd; padding: 15px; margin: 10px; border-radius: 8px;">
                    <h3>${donor.name || 'নাম নেই'}</h3>
                    <p><strong>ব্লাড গ্রুপ:</strong> ${donor.bloodGroup || 'N/A'}</p>
                    <p><strong>লোকেশন:</strong> ${donor.location || 'N/A'}</p>
                    <p><strong>ফোন:</strong> ${donor.phone || 'N/A'}</p>
                    <p><strong>জেলা:</strong> ${donor.district || 'N/A'}</p>
                </div>
            `;
        }
    }

    // নতুন ডোনার যোগ করা
    addNewDonor(donorData) {
        const donorsRef = database.ref('donors');
        const newDonorRef = donorsRef.push();
        
        return newDonorRef.set(donorData)
            .then(() => {
                console.log('ডাটা সফলভাবে সেভ হয়েছে!');
                return true;
            })
            .catch((error) => {
                console.error('Error:', error);
                return false;
            });
    }

    setupEventListeners() {
        // Admin form handling
        const donorForm = document.getElementById('donorForm');
        if (donorForm) {
            donorForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleDonorSubmit(e);
            });
        }
    }

    handleDonorSubmit(e) {
        const formData = new FormData(e.target);
        const donorData = {
            name: formData.get('name'),
            bloodGroup: formData.get('bloodGroup'),
            location: formData.get('location'),
            district: formData.get('district'),
            phone: formData.get('phone'),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        this.addNewDonor(donorData)
            .then(success => {
                if (success) {
                    alert('ডোনার সফলভাবে যোগ হয়েছে!');
                    e.target.reset();
                } else {
                    alert('ত্রুটি হয়েছে! আবার চেষ্টা করুন।');
                }
            });
    }
}

// App initialize
document.addEventListener('DOMContentLoaded', function() {
    new BloodDonorApp();
});
