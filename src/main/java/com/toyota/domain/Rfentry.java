package com.toyota.domain;


import javax.persistence.*;

@Entity
@Table(name="rfentry")
@NamedQueries({
        @NamedQuery(name="Rfentry.findAll",query ="SELECT p FROM Rfentry p")
})
public class Rfentry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="RFENTRY_ID")
    private int RfentryId;

    @Column(name="RFENTRY_NAME")
    private String RfentryName;

    public int getRfentryId() {
        return RfentryId;
    }

    public void setRfentryId(int rfentryId) {
        RfentryId = rfentryId;
    }

    public String getRfentryName() {
        return RfentryName;
    }

    public void setRfentryName(String rfentryName) {
        RfentryName = rfentryName;
    }

    public Rfentry(String rfentryName) {
        RfentryName = rfentryName;
    }

    public Rfentry() {
    }
    public Rfentry(int RfentryId)
    {
        this.RfentryId=RfentryId;
    }
}
