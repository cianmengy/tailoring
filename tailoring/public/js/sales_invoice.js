frappe.ui.form.on('Sales Invoice', {
    refresh: function(frm) {
        // Filter the Master Tailor field to only show Employees with designation 'Master Tailor'
        frm.set_query('custom_master_tailor', function() {
            return {
                filters: {
                    'designation': 'Master Tailor',
                    'status': 'Active'
                }
            };
        });
    }
});