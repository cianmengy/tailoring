// apps/tailoring/tailoring/public/js/sales_order.js

frappe.ui.form.on('Sales Order', {
    customer: function(frm) {
        if (frm.doc.customer) {
            // 1. AUTO-POPULATE THE LATEST MEASUREMENT ID
            frappe.db.get_value('Customer Measurement', 
                {'customer': frm.doc.customer}, 
                'name', 
                (r) => {
                    if (r && r.name) {
                        frm.set_value('custom_measurement', r.name);
                        frappe.show_alert({
                            message: __('Linked latest measurement: {0}', [r.name]),
                            indicator: 'green'
                        });
                    } else {
                        frm.set_value('custom_measurement', '');
                    }
                }, 'creation desc'
            );

            // 2. FILTER THE SEARCH RESULTS
            frm.set_query('custom_measurement', function() {
                return {
                    filters: {
                        'customer': frm.doc.customer
                    }
                };
            });
        }
    }
});